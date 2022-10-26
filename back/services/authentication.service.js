const MongoDB = require("./mongodb.service");
const { mongoConfig, tokenSecret } = require("../config");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { query } = require("express");

const userRegister = async (user) => {
    try {
        if (!user?.email || !user?.password)
            return { status: false, message: "Please fill all field" };
            const passwordHash = await bcrypt.hash(user?.password, 10);
        let userObject = {
            email: user?.email,
            password: passwordHash,
        };
        let savedUser = await MongoDB.db
            .collection(mongoConfig.collections.USERS)
            .insertOne(userObject);
        if (savedUser?.acknowledged && savedUser?.insertedId) {
            let token = jwt.sign({ email: userObject?.email },
                tokenSecret,
                {expiresIn: '24h'})
            return {
                status: true,
                message: "User registered successfully",
                data: token
            };
        } else {
            return {
                status: false,
                message: "User failed to register",
            }
        }
    } catch (error) {
        console.log(error);
        let errorMessage = "User failed to register";
        error?.code === 11000 && error?.keyPattern?.email ?
        (errorMessage = "email already exist") : null;
        return {
            status: false,
            message: errorMessage,
            error: error?.toString(),  
        }
    }
};

const userLogin = async (user) => {
    try {
        if (!user?.email || !user?.password)
        return { status: false, message: "Please fill all field" };
        let userObject = await MongoDB.db
            .collection(mongoConfig.collections.USERS)
            .findOne({email : user?.email}); 
        if (userObject) {
            let passwordVerify = await bcrypt.compare(
                user?.password,
                userObject?.password
            );
            if (passwordVerify) {
                let token = jwt.sign({ email: userObject?.email },
                    tokenSecret,
                    {expiresIn: '24h'})
                return {
                    status: true,
                    message: "User logged successfully",
                    data: token
                }; 
            } else {
                return {
                    status: false,
                    message: "Incorrect Password",
                };
            }
            
        } else {
            return {
                status: false,
                message: "No user found",
            };
        }
    } catch (error) {
        console.log(error);
        return {
            status: false,
            message: "User failed to login",
            error: error?.toString(),  
        };
    }
};

const checkUserExist = async (query) => {
    let messages = {
        email: "User already exist",
    };
    try {
        let queryType = Object.keys(query)[0];
        let userObject = await MongoDB.db
        .collection(mongoConfig.collections.USERS)
        .findOne(query);
        console.log(userObject)
        return !userObject
        ? { status: true, message: `This ${queryType} is not taken`}
        : { status: false, message: messages[queryType]}
    } catch (error) {}
};

module.exports = { userRegister, userLogin, checkUserExist};
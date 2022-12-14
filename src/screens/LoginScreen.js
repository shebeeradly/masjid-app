import React, { useState, useRef, useEffect } from 'react';
import {
    View, Text, StyleSheet, TextInput, StatusBar,
    TouchableOpacity, Pressable
} from 'react-native';
import Masjid from '../assets/images/masjidlog.svg';
import { Seperator } from '../components';
import { Colors, Fonts, Images } from '../constants';
import { Display } from '../utils';
import Thumb from '../assets/images/thumb.svg';
import LinearGradient from 'react-native-linear-gradient';
import AuthenticationService from '../services/AuthenticationService';
import LottieView from 'lottie-react-native';
import { useSelector, useDispatch } from "react-redux";
import { GeneralAction } from '../actions';
import StorageService from '../services/StorageService';
import TouchID from 'react-native-touch-id';

const inputStyle = state => {
    switch (state) {
        case 'valid':
            return {
                ...styles.emailInput,
                borderWidth: 4,
                borderColor: Colors.SECONDARY_GREEN,
                borderBottomEndRadius: 13,
                borderBottomStartRadius: 13,
                borderTopEndRadius: 13,
                borderTopStartRadius: 13
            };
        case 'invalid':
            return {
                ...styles.emailInput,
                borderWidth: 4,
                borderColor: Colors.SECONDARY_RED,
                borderBottomEndRadius: 13,
                borderBottomStartRadius: 13,
                borderTopEndRadius: 13,
                borderTopStartRadius: 13
            };
        default:
            return styles.emailInput;
    }
}

const LoginScreen = ({ navigation }) => {

    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false) // lottie
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [existErrorMessage, setExistErrorMessage] = useState('');
    const [emailState, setEmailState] = useState('default');
    const [isAuth, setIsAuth] = useState(false); // finger

    const { isFirstTimeUse } = useSelector(
        state => state?.generalState,
    );
    const dispatch = useDispatch();
    const firstInput = useRef();

    const login = async () => {
        setLoading(true);
        let user = {
            email,
            password,
        };
        AuthenticationService.login(user).then(response => {
            setLoading(false);
            if (response?.status) {
                StorageService.setToken(response?.data).then(() => {
                    dispatch(GeneralAction.setToken(response?.data));
                });
                setErrorMessage('')
            } else {
                setErrorMessage(response?.message);
            }
        })
        // navigation.navigate('Main')
    }

    const checkUserExist = async (type, value) => {
        if (value?.length > 0) {
            await AuthenticationService.checkUserExist(type, value)
                .then(response => {
                    if (!response.status) {
                        type === 'email' && existErrorMessage
                            ? setExistErrorMessage('') : null;
                        type === 'email' ? setEmailState('valid') : null;
                    } else {
                        type === 'email' ?
                            setExistErrorMessage("Email not found") : null;
                        type === 'email' ? setEmailState('invalid') : null;
                    }
                })
        }
    };

    //< finger sensor react native touch id
    const optionalConfigObject = {
        title: 'Authentication Required', // Android
        imageColor: '#11F542', // Android
        imageErrorColor: '#ff0000', // Android
        sensorDescription: 'Touch sensor', // Android
        sensorErrorDescription: 'Failed', // Android
        cancelText: 'Cancel', // Android
        fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
        unifiedErrors: false, // use unified error messages (default false)
        passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };

    useEffect(() => {
        isAuth ? dispatch(GeneralAction.setToken('true')) : null;
    });

    const handleBiometric = () => {
        TouchID.isSupported(optionalConfigObject).then(biometryType => {
            if (biometryType === 'FaceID') {
                console.log('FaceID is supported.');
            } else {
                console.log('TouchID is supported.');

                TouchID.authenticate('', optionalConfigObject)
                    .then(success => {
                        setIsAuth(success);
                    })
                    .catch(error => {
                        console.log('Error', error);
                    });

            }
        })
            .catch(error => {
                console.log(error);
            });
    }
    //finger sensor >

    return (
        <View style={styles.main}>
            <StatusBar
                barStyle='dark-content'
                backgroundColor={Colors.DEFAULT_WHITE} />
            <Seperator height={StatusBar.currentHeight} />
            <Masjid width={40} height={40} style={styles.logo} />
            <Seperator height={10} />
            {
                isFirstTimeUse ?
                    <Seperator height={111} /> : null
            }
            <View style={styles.container}>
                <Text style={styles.heading}>Login</Text>
                <Seperator height={111} />

                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
                    style={inputStyle(emailState)}>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='E-mail'
                            style={styles.txtInput}
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                            onEndEditing={({ nativeEvent: { text } }) =>
                                checkUserExist('email', text) &&
                                firstInput.current.focus()} />
                    </View>
                </LinearGradient>

                <Text style={styles.warningTxt}>{existErrorMessage}</Text>

                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
                    style={styles.emailInput}>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='Password'
                            secureTextEntry={true}
                            ref={firstInput}
                            style={styles.txtInput}
                            onChangeText={(text) => setPassword(text)} />
                    </View>
                </LinearGradient>
                <Text style={styles.warningTxt}>{errorMessage}</Text>

                <TouchableOpacity
                    onPress={() => login()}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
                        style={styles.logButton}>
                        {loading ?
                            <LottieView source={Images.LOADING} autoPlay /> :
                            <Text style={styles.logBtnTxt}>LOGIN</Text>}
                    </LinearGradient>
                </TouchableOpacity>

                <Seperator height={20} />
                <View style={styles.textTouch}>
                    <Text
                        style={styles.RegTouchTxt}
                        onPress={() => navigation.navigate('Register')}>Register</Text>
                    <Text style={styles.forgTouchTxt}
                        onPress={() => navigation.navigate('Forgot')}>Forgot Password</Text>
                </View>
                <Seperator height={70} />

                {
                    !isFirstTimeUse ?
                        <Pressable
                            onPress={() => handleBiometric()}>
                            <Thumb height={70} width={70} />
                        </Pressable> : null
                }

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE,
    },
    logo: {
        marginLeft: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    heading: {
        fontSize: 30,
        fontFamily: Fonts.POPPINS_MEDIUM
    },
    emailInput: {
        backgroundColor: Colors.SECONDARY_GREEN,
        marginHorizontal: 20,
        height: Display.setHeight(7),
        width: Display.setWidth(77),
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtInput: {
        width: Display.setWidth(75),
        textAlign: 'center'
    },
    inputContainer: {
        backgroundColor: Colors.DEFAULT_WHITE,
        height: Display.setHeight(6),
        width: Display.setWidth(75),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logButton: {
        backgroundColor: Colors.SECONDARY_GREEN,
        marginHorizontal: 20,
        height: Display.setHeight(7),
        width: Display.setWidth(77),
        borderRadius: 13,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logBtnTxt: {
        color: Colors.SECONDARY_WHITE,
        fontSize: 15,
        fontFamily: Fonts.POPPINS_MEDIUM
    },
    textTouch: {
        flexDirection: 'row',
        marginHorizontal: 20
    },
    RegTouchTxt: {
        marginRight: 50,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DARK_FIVE
    },
    forgTouchTxt: {
        marginLeft: 50,
        fontFamily: Fonts.POPPINS_SEMI_BOLD,
        color: Colors.DARK_FIVE
    },
    warningTxt: {
        fontSize: 10,
        right: 77,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DEFAULT_RED,
        lineHeight: 10 * 1.4,
        marginVertical: 5
    },

});

export default LoginScreen;
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    SplashScreen, WelcomeScreen, ForgotPassword,
    LoginScreen, RegisterScreen, PhoneScreen,
} from '../screens';
import { useSelector, useDispatch } from "react-redux";
import { GeneralAction } from '../actions';
import DrawerScreen from './DrawerScreen';

const Stack = createNativeStackNavigator();

const Navigators = () => {
    const { isAppLoading, token, isFirstTimeUse } = useSelector(
        state => state?.generalState,
    );
        
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GeneralAction.appStart());
    }, [])

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{ headerShown: false }}>
                {
                    isAppLoading ? (
                        <Stack.Screen name="Splash" component={SplashScreen} />
                    ) :
                        !token || token === null || token === '' ? (
                            <>
                                {isFirstTimeUse && (
                                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                                )}
                                <Stack.Screen name="Login" component={LoginScreen} />
                                <Stack.Screen name="Register" component={RegisterScreen} />
                                <Stack.Screen name="Forgot" component={ForgotPassword} />
                                <Stack.Screen name="Phone" component={PhoneScreen} />
                            </>
                        ) : (
                            <Stack.Screen name="Drawer" component={DrawerScreen} />
                        )
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
};

export default Navigators;
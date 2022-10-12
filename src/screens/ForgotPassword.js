import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity, TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Masjid from '../assets/images/masjidlog.svg';
import Seperator from '../components/Seperator';
import { Colors, Fonts, Images } from '../constants';
import Display from '../utils/Display';
import LottieView from 'lottie-react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthenticationService from '../services/AuthenticationService';

const inputStyle = state => {
    switch (state) {
        case 'valid':
            return {
                ...styles.emailInput,
                borderWidth: 3,
                borderColor: Colors.SECONDARY_GREEN,
                borderBottomEndRadius: 13,
                borderBottomStartRadius: 13,
                borderTopEndRadius: 13,
                borderTopStartRadius: 13
            };
            break;
        case 'invalid':
            return {
                ...styles.emailInput,
                borderWidth: 3,
                borderColor: Colors.SECONDARY_RED,
                borderBottomEndRadius: 13,
                borderBottomStartRadius: 13,
                borderTopEndRadius: 13,
                borderTopStartRadius: 13
            };
        default:
            return styles.emailInput;
            break;
    }
}

const ForgotPassword = ({ navigation }) => {

    const [emailState, setEmailState] = useState('default');
    const [existErrorMessage, setExistErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');

    const reset = () => {
        if (email?.length > 0) {
            setLoading(true)
        } else {
            setExistErrorMessage("Please need email")
        }
    };

    const checkUserExist = async (type, value) => {
        if (value?.length > 0) {
            AuthenticationService.checkUserExist(type, value).then(response => {
                if (!response?.status) {
                    type === 'email' && existErrorMessage
                        ? setExistErrorMessage('') : null;
                    type === 'email' ? setEmailState('valid') : null;

                } else {
                    type === 'email' ? setExistErrorMessage("Email not found") : null;
                    type === 'email' ? setEmailState('invalid') : null;
                }
            })
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle='dark-content'
                translucent backgroundColor="transparent" />

            <View style={styles.splashcontainer}>
                {/* <Login style={styles.splashcolor} /> */}
                <Seperator height={StatusBar.currentHeight} />
                <Seperator height={10} />
                <View style={styles.headerContainer}>
                    <Ionicons
                        name="chevron-back-outline"
                        size={30}
                        color='#40AFFF'
                        onPress={() => navigation.goBack()}
                    />
                    <Text style={styles.headerTitle}>Reset Password</Text>
                </View>

                <Seperator height={100} />

                <Text style={styles.welText}>Forgote password ?</Text>
                <Text style={styles.forgTouchTxt}>Please Enter your Email so we can help you
                    Recover your Password
                </Text>


                <Seperator height={100} />

                <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
                    style={inputStyle(emailState)}>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder='Enter Mail Id'
                            placeholderTextColor={Colors.DARK_FIVE}
                            style={styles.txtInput}
                            keyboardType="email-address"
                            onChangeText={(text) => setEmail(text)}
                            onEndEditing={({ nativeEvent: { text } }) =>
                                checkUserExist('email', text)} />
                    </View>
                </LinearGradient>
                <Text style={styles.errorMessage}>{existErrorMessage}</Text>

                <TouchableOpacity
                    onPress={() => reset()}
                >
                    <LinearGradient
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
                        style={styles.logButton}>
                        {loading ? (
                            <LottieView source={Images.LOADING} autoPlay />
                        ) : (
                            <Text style={styles.logBtnTxt}>Reset Password</Text>
                        )
                        }
                    </LinearGradient>
                </TouchableOpacity>

                <Seperator height={100} />
                <Masjid width={70} height={70} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE
    },
    splashcolor: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    splashcontainer: {
        alignItems: 'center',
    },
    welText: {
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: '#40AFFF',
        fontSize: 23,
        left: -30
    },
    mailPosintion: {
        alignItems: 'center'
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
        height: Display.setHeight(6.5),
        width: Display.setWidth(75.5),
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
    forgTouchTxt: {
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: Colors.DARK_FIVE,
        fontSize: 13,
        marginHorizontal: 38
    },
    headerTitle: {
        fontSize: 17,
        fontFamily: Fonts.POPPINS_MEDIUM,
        lineHeight: 17 * 1.4,
        width: Display.setWidth(77),
        textAlign: 'center',
        color: '#11F542',
        left: 50
    },
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    errorMessage: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        color: Colors.DEFAULT_RED,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginVertical: 5,
        right: 77
    },
});

export default ForgotPassword;
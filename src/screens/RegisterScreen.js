import React, { useState, useRef } from 'react';
import {
  View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, ScrollView,
  KeyboardAvoidingView, Switch
} from 'react-native';
import Masjid from '../assets/images/masjidlog.svg';
import ProfilePic from '../assets/images/profilepic.svg';
import { Seperator } from '../components';
import { Colors, Fonts, Images } from '../constants';
import { Display } from '../utils';
import LinearGradient from 'react-native-linear-gradient';
import AuthenticationService from '../services/AuthenticationService';
import LottieView from 'lottie-react-native';
import { useDispatch } from 'react-redux';
import { GeneralAction } from '../actions';
import StorageService from '../services/StorageService';

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
      break;
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
      break;
  }
};

const RegisterScreen = ({ navigation, setToken }) => {
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [isEnabled, setIsEnabled] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [emailState, setEmailState] = useState('default');
  const [passwordState, setPasswordState] = useState('default');

  const firstInput = useRef();
  const secondInput = useRef();
  const dispatch = useDispatch()

  const register = () => {
    let user = {
      email,
      password,
      confirmPassword
    }
    if (email?.includes('@' && '.')) {

      if ((user?.password && user?.confirmPassword).length > 0) {
        if (user.password === user.confirmPassword) {
          setPasswordState('valid')
          setErrorMessage('')
          setLoading(true)
          AuthenticationService.register(user).then(response => {

            if (response?.status) {
              setLoading(false)
              isEnabled 
              ?              
              StorageService.setFirstTimeUse().then(() => {
                dispatch(GeneralAction.setIsFirstTimeUse())
              }) &&
              StorageService.setToken(response?.data).then(() => {
                dispatch(GeneralAction.setToken(response?.data));
              }) 
              :             
              dispatch(GeneralAction.setToken(response?.data));
              StorageService.setFirstTimeUse().then(() => {
                dispatch(GeneralAction.setIsFirstTimeUse())
              })

            } else {
              setErrorMessage(response?.message)
            }
          })
          // navigation.navigate('Main')
        };
      } else {
        setPasswordState('invalid')
        setErrorMessage('Password Mismatch')
      }

    } else {
      setEmailErrorMessage("Please Enter a valid Email")
      setEmailState('invalid')
    }
  }


  let passwordTest = () => {
    let user = {
      email,
      password,
      confirmPassword,
    }
    if ((user?.password && user?.confirmPassword).length > 0) {
      if (user.password === user.confirmPassword) {
        setPasswordState('valid')
        setErrorMessage('')
      } else {
        setPasswordState('invalid')
        setErrorMessage('Password Mismatch')
      }
    }
  };

  const checkUserExist = async (type, value) => {
    if (value?.length > 0) {
      AuthenticationService.checkUserExist(type, value).then(response => {
        if (response?.status) {
          // console.log(response?.status)
          type === 'email' && emailErrorMessage
            ? setEmailErrorMessage('') : null;
          type === 'email' ? setEmailState('valid') : null;
        } else {
          type === 'email'
            ? setEmailErrorMessage(response?.message) : null;
          type === 'email' ? setEmailState('invalid') : null;
        }
      })
    }
  }

  return (
    <ScrollView style={styles.main}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={Colors.DEFAULT_WHITE} />
      <Seperator height={StatusBar.currentHeight} />
      <Masjid width={40} height={40} style={styles.logo} />
      <Seperator height={5} />
      <View style={styles.container}>
        <Text style={styles.heading}>Register</Text>
        <Seperator height={40} />
        <ProfilePic width={190} height={190} />

        <Seperator height={25} />
        <KeyboardAvoidingView>
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
            style={inputStyle(emailState)}>
            <View style={styles.inputContainer}>
              <TextInput placeholder='E-mail'
                style={styles.textTouchWidth}
                keyboardType='email-address'
                onChangeText={(text) => setEmail(text)}
                onEndEditing={({ nativeEvent: { text } }) =>
                  checkUserExist('email', text) &&
                  firstInput.current.focus()} />
            </View>
          </LinearGradient>
          <Text style={styles.errorMessage}>{emailErrorMessage}</Text>

          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
            style={styles.emailInput}>
            <View style={styles.inputContainer}>
              <TextInput placeholder='Password'
                secureTextEntry={true}
                style={styles.textTouchWidth}
                ref={firstInput}
                onChangeText={(text) => setPassword(text)}
                onEndEditing={() => secondInput.current.focus()} />
            </View>
          </LinearGradient>
          <Seperator height={20} />

          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
            style={inputStyle(passwordState)}>
            <View style={styles.inputContainer}>
              <TextInput placeholder='Confirm Password'
                secureTextEntry={true}
                style={styles.textTouchWidth}
                ref={secondInput}
                onChangeText={(text) => setConfirmPassword(text)}
                onEndEditing={() => passwordTest()} />
            </View>
          </LinearGradient>
          <Text style={styles.errorMessage}>{errorMessage}</Text>

          <TouchableOpacity
            onPress={() => register()}>
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
              style={styles.logButton}>{loading ?
                <LottieView source={Images.LOADING} autoPlay /> :
                <Text style={styles.logBtnTxt}>REGISTER</Text>}
            </LinearGradient>
          </TouchableOpacity>

          <Seperator height={20} />
          <View style={styles.textTouch}>
            <Text
              style={styles.logTouchTxt}
              onPress={() => navigation.navigate('Login')}>Login</Text>
            <View style={styles.switch}>
              <Switch
                trackColor={{ false: "#40AFFF", true: "#81b0ff" }}
                thumbColor={isEnabled ? "#11F542" : "#f4f3f4"}
                onValueChange={toggleSwitch}
                value={isEnabled} />
              <Text style={styles.forgTouchTxt}>Remember Me</Text>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'center',
    right: 3
  },
  textTouchWidth: {
    width: Display.setWidth(75),
    textAlign: 'center'
  },
  logTouchTxt: {
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DARK_FIVE
  },
  forgTouchTxt: {
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    color: Colors.DARK_FIVE
  },
  switch: {
    flexDirection: 'row',
    marginLeft: 77
  },
  errorMessage: {
    fontSize: 10,
    lineHeight: 10 * 1.4,
    color: Colors.DEFAULT_RED,
    fontFamily: Fonts.POPPINS_MEDIUM,
    marginHorizontal: 22,
    marginVertical: 5,
  },
});

export default RegisterScreen;
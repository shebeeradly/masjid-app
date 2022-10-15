import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, StatusBar, TouchableOpacity } from 'react-native';
import Masjid from '../assets/images/masjidlog.svg';
import { Seperator } from '../components';
import { Colors, Fonts } from '../constants';
import { Display } from '../utils';
import LinearGradient from 'react-native-linear-gradient';
import TouchID from 'react-native-touch-id';
import { useDispatch } from 'react-redux';
import { GeneralAction } from '../actions';
import Thumb from '../assets/images/thumb.svg';

const WelcomeScreen = ({ navigation }) => {
  const [isAuth, setIsAuth] = useState(false);

  const dispatch = useDispatch();

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

      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}>
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
            style={styles.regButton}>
            <Text style={styles.regBtnTxt}>REGISTER</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Seperator height={27} />

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}>
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
            style={styles.regButton}>
            <View style={styles.borderButton}>
              <Text style={styles.logBtnTxt}>LOGIN</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <Seperator height={111} />
        <Pressable
          onPress={() => handleBiometric()}>
          <Thumb height={70} width={70} />
        </Pressable>

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
    top: 222,
    justifyContent: 'center',
    alignItems: 'center',
  },
  regButton: {
    backgroundColor: Colors.SECONDARY_GREEN,
    marginHorizontal: 20,
    height: Display.setHeight(7),
    width: Display.setWidth(77),
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  regBtnTxt: {
    color: Colors.SECONDARY_WHITE,
    fontSize: 15,
    fontFamily: Fonts.POPPINS_MEDIUM
  },
  borderButton: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: Display.setHeight(6),
    width: Display.setWidth(75),
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logBtnTxt: {
    color: Colors.DARK_FIVE,
    fontSize: 15,
    fontFamily: Fonts.POPPINS_MEDIUM
  }
});

export default WelcomeScreen;
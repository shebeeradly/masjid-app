import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Masjid from '../assets/images/masjidlog.svg';
import { Seperator } from '../components';
import { Colors, Fonts } from '../constants';
import { Display } from '../utils';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { GeneralAction } from '../actions';

const WelcomeScreen = ({ navigation }) => {

  return (
    <View style={styles.main}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={Colors.DEFAULT_WHITE} />
      <Seperator height={StatusBar.currentHeight} />
      <Masjid width={40} height={40} style={styles.logo} />
      <Seperator height={77} />

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
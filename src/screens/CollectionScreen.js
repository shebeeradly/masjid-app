import React from 'react';
import { 
  View, Text, StyleSheet, TextInput, StatusBar, TouchableOpacity, ScrollView, KeyboardAvoidingView
 } from 'react-native';
import Masjid from '../assets/images/masjidlog.svg';
import LeftArrow from '../assets/images/leftarrow.svg';
import { Seperator } from '../components';
import { Colors, Fonts } from '../constants';
import { Display } from '../utils';
import LinearGradient from 'react-native-linear-gradient';

const CollectionScreen = ({navigation}) => {
  return (
    <ScrollView style={styles.main}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={Colors.DEFAULT_WHITE} />
      <Seperator height={StatusBar.currentHeight} />

      <View style={styles.searchContainerMain}>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
          style={styles.linearInput}>
          <View style={styles.inputSearchContainer}>
            <TouchableOpacity
            onPress={() => navigation.navigate('Book')}>
            <LeftArrow width={30} height={30} marginHorizontal={3} />
            </TouchableOpacity>
            <TextInput placeholder='Search here'
              style={styles.searchTxtInput} />
            <Masjid width={40} height={40} marginHorizontal={5}/>
          </View>
        </LinearGradient>
      </View>

      <Seperator height={40} />
      <View style={styles.container}>
        <Text style={styles.heading}>Add New Masjid</Text>

        <Seperator height={50} />

        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
          style={styles.emailInput}>
          <View style={styles.inputContainer}>
            <TextInput placeholder='Location'
            style={styles.txtInpt} />
          </View>
        </LinearGradient>

        <Seperator height={20} />

        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
          style={styles.emailInput}>
          <View style={styles.inputContainer}>
            <TextInput placeholder='Name'
            style={styles.txtInpt} />
          </View>
        </LinearGradient>

        <Seperator height={20} />
        <KeyboardAvoidingView>
        <LinearGradient
          start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
          style={styles.briefInput}>
          <View style={styles.briefContainer}>
            <TextInput
              multiline={true}
              placeholder={'Notes \n (Brief about the masjid) \n (History / Incidents)'}
              textAlign={'center'}
              style={styles.textInput}
            />

          </View>
        </LinearGradient>
        </KeyboardAvoidingView>

        <Seperator height={20} />
        <TouchableOpacity 
        // onPress={() => navigation.navigate('Main')}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
            style={styles.emailInput}>
            <View style={styles.inputContainer}>
              <Text style={styles.photoText}>Add photos</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>

        <Seperator height={45} />

        <TouchableOpacity
        onPress={() => navigation.navigate('Settings')}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
            style={styles.logButton}>
            <Text style={styles.addBtnTxt}>Add New Masjid</Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: Colors.DEFAULT_WHITE,
  },
  searchContainerMain: {
    alignItems: 'center'
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchTxtInput: {
    width: Display.setWidth(60),
    textAlign: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  heading: {
    fontSize: 30,
    fontFamily: Fonts.POPPINS_MEDIUM
  },
  linearInput: {
    backgroundColor: Colors.SECONDARY_GREEN,
    marginHorizontal: 20,
    height: Display.setHeight(7),
    width: Display.setWidth(85),
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10
  },
  inputSearchContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: Display.setHeight(6),
    width: Display.setWidth(83),
    borderRadius: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
  briefInput: {
    backgroundColor: Colors.SECONDARY_GREEN,
    marginHorizontal: 20,
    height: Display.setHeight(20),
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
  briefContainer: {
    backgroundColor: Colors.DEFAULT_WHITE,
    height: Display.setHeight(19),
    width: Display.setWidth(75),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtInpt: {
    width: Display.setWidth(70),
    textAlign: 'center'
  },
  textInput: {
    height: Display.setHeight(17),
    width: Display.setWidth(70),
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
  addBtnTxt: {
    color: Colors.SECONDARY_WHITE,
    fontSize: 15,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  photoText: {
    color: Colors.DARK_FIVE,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 15,
  }
});

export default CollectionScreen;
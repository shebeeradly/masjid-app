import React from "react";
import {
  StyleSheet, Text, View, StatusBar, TouchableOpacity,
} from "react-native";
import { Seperator } from "../components";
import { Colors, Fonts } from "../constants";
import { Display } from "../utils";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { GeneralAction } from '../actions';
import LinearGradient from "react-native-linear-gradient";
import Icoprofile from '../assets/images/icoprofile.svg';
import ShareS from '../assets/images/shareS.svg';
import Bookmark from '../assets/images/bookmark.svg';
import Feedback from '../assets/images/feedback.svg';

const SettingScreen = ({ navigation }) => {

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(GeneralAction.setToken(''));
  };

  return (
    <View style={styles.centeredView}>
      <StatusBar backgroundColor="transparent"
        barStyle='dark-content'
        translucent />
      <Seperator height={StatusBar.currentHeight} />

      <LinearGradient style={styles.linear}
        start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#11F542', '#40AFFF',]}>
        <Seperator height={111} />
        <TouchableOpacity style={styles.proImageContainer}>
          <View style={styles.mainRound}>
            <View style={styles.round} />
            <Seperator height={8} />
            <MaterialCommunityIcons
              name="camera"
              size={50}
              color={Colors.DEFAULT_GREY}
            />
            <Text style={styles.photoText}>Profile {'\n'} Photo</Text>
            <View style={styles.sholder} />
          </View>
          <Seperator height={15} />
          <Text style={styles.modalText}>Shebeer Muhammed</Text>
        </TouchableOpacity>
        <Seperator height={77} />

        <View style={styles.navContainer}>
          <TouchableOpacity>
            <View style={styles.lowerContainer}>
              <Icoprofile width={25} height={25} />
              <Text style={styles.lowerText}>Edit Profile</Text>
            </View>
          </TouchableOpacity>

          <Seperator height={20} />
          <TouchableOpacity>
            <View style={styles.lowerContainer}>
              <ShareS height={25} width={25} />
              <Text style={styles.lowerText}>Share</Text>
            </View>
          </TouchableOpacity>

          <Seperator height={20} />

          <TouchableOpacity
            onPress={() => navigation.navigate('Book')}>
            <View style={styles.lowerContainer}>
              <Bookmark width={25} height={25} />
              <Text style={styles.lowerText}>Bookmark</Text>
            </View>
          </TouchableOpacity>

          <Seperator height={20} />

          <TouchableOpacity
            onPress={() => navigation.navigate('Feedback')}>
            <View style={styles.lowerContainer}>
              <Feedback width={25} height={25} />
              <Text style={styles.lowerText}>Feedback</Text>
            </View>
          </TouchableOpacity>
          <Seperator height={20} />
          <TouchableOpacity
            style={styles.lowerContainer}
            activeOpacity={0.8}
            onPress={() => logout()}>
            <MaterialCommunityIcons
              name="logout"
              size={27}
              color={Colors.DEFAULT_WHITE}
            />
            <Text style={styles.lowerText}>Logout</Text>
          </TouchableOpacity>
        </View>

      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linear: {
    height: Display.setHeight(105),
    width: Display.setWidth(100),
  },
  proImageContainer: {
    alignItems: 'center'
  },
  mainRound: {
    height: 120,
    width: 120,
    backgroundColor: Colors.DEFAULT_WHITE,
    borderRadius: 60,
    alignItems: 'center'
  },
  round: {
    height: 50,
    width: 50,
    backgroundColor: Colors.LIGHT_GREY2,
    borderRadius: 25,
    marginTop: 10
  },
  sholder: {
    height: 40,
    width: 90,
    backgroundColor: Colors.LIGHT_GREY2,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    position: 'absolute',
    top: 60,
    zIndex: -1
  },
  photoText: {
    fontSize: 10,
    position: 'absolute',
    top: 77,
    paddingLeft: 5,
    paddingTop: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 17
  },
  lowerContainer: {
    flexDirection: 'row',
    marginLeft: 25
  },
  lowerText: {
    marginLeft: 15,
    color: Colors.DEFAULT_WHITE,
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 17
  },

});

export default SettingScreen;
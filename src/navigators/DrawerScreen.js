import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './HomeScreen';
import {
  StyleSheet, Text, View, Image, TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Seperator } from "../components";
import { Colors, Fonts, Images } from "../constants";
import { Display } from "../utils";
import Icoprofile from '../assets/images/icoprofile.svg';
import Icosettings from '../assets/images/icosettings.svg';
import Bookmark from '../assets/images/bookmark.svg';
import Feedback from '../assets/images/feedback.svg';
import { FeedbackScreen } from '../screens';

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  return (
    <Drawer.Navigator drawerHideStatusBarOnOpen={true}
      screenOptions={{ headerShown: false }}
      drawerContent={({ state, navigation, descriptors }) => {
        return (
          <View style={styles.centeredView}>
            <LinearGradient style={styles.linear}
              start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#11F542', '#40AFFF',]}>
              <Seperator height={30} />
              <View style={styles.modalView}>

                <TouchableOpacity
                  onPress={() => navigation.closeDrawer()}
                  style={styles.close}
                >
                  <Image source={Images.CLOSE}
                    height={10} width={10} style={{ top: 10, right: 10 }} />
                </TouchableOpacity>
              </View>
              <Seperator height={111} />
              <View style={styles.proImageContainer}>
                <View style={styles.mainRound}>
                  <View style={styles.round} />
                  <View style={styles.sholder}>
                    <Text style={styles.photoText}>Profile {'\n'} Photo</Text>
                  </View>
                </View>
                <Seperator height={15} />
                <Text style={styles.modalText}>Shebeer Muhammed</Text>
              </View>
              <Seperator height={77} />

              <View style={styles.navContainer}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Profile')}>
                  <View style={styles.lowerContainer}>
                    <Icoprofile width={25} height={25} />
                    <Text style={styles.lowerText}>Profile</Text>
                  </View>
                </TouchableOpacity>

                <Seperator height={20} />
                <TouchableOpacity
                  onPress={() => navigation.navigate('Settings')}>
                  <View style={styles.lowerContainer}>
                    <Icosettings width={25} height={25} />
                    <Text style={styles.lowerText}>Settings</Text>
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
                  onPress={() => navigation.navigate('CollectionMain')}>
                  <View style={styles.lowerContainer}>
                    <Seperator width={30} />
                    <Text style={styles.lowerText}>Add New Masjid</Text>
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
              </View>

            </LinearGradient>
          </View>
        )
      }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Feedback" component={FeedbackScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    alignItems: 'flex-end'
  },
  linear: {
    height: '100%',
    width: '100%',
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
    borderTopStartRadius: 50
  },
  photoText: {
    fontSize: 10
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
  close: {
    top: 10,
    right: 10
  },
  navContainer: {
    marginLeft: 10
  }

});

export default DrawerScreen;
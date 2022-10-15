import React, { useState} from "react";
import {
  Modal, StyleSheet, Text, Pressable, View, StatusBar, Image, TouchableOpacity
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { Seperator } from "../components";
import { Colors, Fonts, Images } from "../constants";
import { Display } from "../utils";
import Icoprofile from '../assets/images/icoprofile.svg';
import Icosettings from '../assets/images/icosettings.svg';
import Bookmark from '../assets/images/bookmark.svg';
import Feedback from '../assets/images/feedback.svg';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const ProfileScreen = ({navigation}) => {
    
  const [modalVisible, setModalVisible] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     setModalVisible(true)
  //   });
  //   return unsubscribe;
  // })
  return (
    <View style={styles.centeredView}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={Colors.DEFAULT_WHITE} />
      <Seperator height={StatusBar.currentHeight} />

      <Modal
        animationType="slide"
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }} >

        <View style={styles.centeredView}>
          <LinearGradient style={styles.linear}
            start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['#11F542', '#40AFFF',]}>

            <View style={styles.modalView}>

              <TouchableOpacity
                style={styles.close}
                onPress={() => setModalVisible(!modalVisible)} >
                <Image source={Images.CLOSE} height={10} width={10}/>
              </TouchableOpacity>
            </View>
            <Seperator height={30} />
            <View style={styles.proImageContainer}>
              <View style={styles.mainRound}>
                <View style={styles.round} />
                <View style={styles.sholder}>
                  <Text style={styles.photoText}>Profile {'\n'} Photo</Text>
                </View>
              </View>
              <Seperator height={10} />
              <Text style={styles.modalText}>Shebeer Muhammed</Text>
            </View>
            <Seperator height={50} />

            <View style={styles.lowerContainer}>
              <Icoprofile width={25} height={25} />
              <Text style={styles.lowerText}>Profile</Text>
            </View>

            <Seperator height={20} />
            {/* <TouchableOpacity
              onPress={() => navigation.navigate('Settings')}> */}
            <View style={styles.lowerContainer}>
              <Icosettings width={25} height={25} />
              <Text style={styles.lowerText}>Settings</Text>
            </View>
            {/* </TouchableOpacity> */}

            <Seperator height={20} />

            {/* <TouchableOpacity
              onPress={() => navigation.navigate('Book')}> */}
            <View style={styles.lowerContainer}>
              <Bookmark width={25} height={25} />
              <Text style={styles.lowerText}>Bookmark</Text>
            </View>
            {/* </TouchableOpacity> */}

            <Seperator height={20} />

            {/* <TouchableOpacity
              onPress={() => navigation.navigate('Collection')}> */}
            <View style={styles.lowerContainer}>
              <Seperator width={30} />
              <Text style={styles.lowerText}>Add New Masjid</Text>
            </View>
            {/* </TouchableOpacity> */}

            <Seperator height={20} />

            <View style={styles.lowerContainer}>
              <Feedback width={25} height={25} />
              <Text style={styles.lowerText}>Feedback</Text>
            </View>

          </LinearGradient>
        </View>

      </Modal>

      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
      </View>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Icoprofile width={23} height={23} />
        <Seperator width={5} />
        <Text style={styles.textStyle}>See Profile</Text>
      </Pressable>
    </View>
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
    height: Display.setHeight(70),
    width: Display.setWidth(70),
    borderRadius: 20,

  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: Colors.SECONDARY_GREEN,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonClose: {
    backgroundColor: "white",
    height: 50,
    width: 50,
    marginEnd: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    marginTop: 5
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
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
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
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  close: {
    top: 10,
    right:10
  }
});

export default ProfileScreen;
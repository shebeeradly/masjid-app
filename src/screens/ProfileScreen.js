import React from "react";
import {
  StyleSheet, TextInput, View, StatusBar, TouchableOpacity, KeyboardAvoidingView
} from "react-native";
import { Seperator } from "../components";
import { Colors, Fonts } from "../constants";
import { Display } from "../utils";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import Masjid from '../assets/images/masjidlog.svg';
import LeftArrow from '../assets/images/leftarrow.svg';

const HomeScreen = ({ navigation }) => {

  return (
    <View style={styles.centeredView}>
      <StatusBar 
      backgroundColor= 'transparent'
        barStyle='dark-content'
        translucent />
      <Seperator height={StatusBar.currentHeight} />
      
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
      <KeyboardAvoidingView>
        <View style={styles.searchContainerMain}>
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
            style={styles.linearInput}>
            <View style={styles.inputSearchContainer}>
              <TouchableOpacity
                onPress={() => navigation.openDrawer()}>
                <LeftArrow width={30} height={30} marginHorizontal={3} />
              </TouchableOpacity>
              <TextInput placeholder='Search here'
                style={styles.searchTxtInput} />
              <Masjid width={40} height={40} marginHorizontal={5} />
            </View>
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute'
  },

  container: {
    ...StyleSheet.absoluteFillObject,
    height: Display.setHeight(100),
    width: Display.setWidth(100),
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject, zIndex: -1
  },
  searchContainerMain: {
    alignItems: 'center',
    marginHorizontal: 7,
    top: 20
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchTxtInput: {
    width: Display.setWidth(60),
    textAlign: 'center'
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

});

export default HomeScreen;
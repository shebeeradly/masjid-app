import React from "react";
import {
  StyleSheet, Text, View, StatusBar, TouchableOpacity
} from "react-native";
import { Seperator } from "../components";
import { Colors, Fonts} from "../constants";
import { Display } from "../utils";

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {GeneralAction} from '../actions';
import StorageService from "../services/StorageService";

const SettingScreen = () => {

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(GeneralAction.setToken(''));
    // StorageService.setToken('').then(() => {
    //   dispatch(GeneralAction.setToken(''));
    //   dispatch(GeneralAction.setUserData(null));
    // });
  };
    
 

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

      <View style={styles.sectionContainer}>
          <TouchableOpacity
            style={styles.sectionTextContainer}
            activeOpacity={0.8}
            onPress={() => logout()}>
            <MaterialCommunityIcons
              name="logout"
              size={23}
              color={Colors.DEFAULT_GREEN}
            />
            <Text style={styles.sectionText}>Logout</Text>
          </TouchableOpacity>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  
  container: {
    ...StyleSheet.absoluteFillObject,
    height: Display.setHeight(70),
    width: Display.setWidth(100),
    left: 7,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  close: {
    top: 10,
    right:10
  },
  sectionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  sectionTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 17,
    fontFamily: Fonts.POPPINS_REGULAR,
    lineHeight: 17 * 1.4,
    color: Colors.INACTIVE_GREY,
    marginLeft: 10,
  },
});

export default SettingScreen;
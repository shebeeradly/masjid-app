import React from "react";
import {
  StyleSheet, Text, View, StatusBar, TouchableOpacity
} from "react-native";
import { Seperator } from "../components";
import { Colors, Fonts} from "../constants";
import { Display } from "../utils";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch} from 'react-redux';
import {GeneralAction} from '../actions';
import StorageService from "../services/StorageService";

const SettingScreen = () => {

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(GeneralAction.setToken(''));
  };
    
  return (
    <View style={styles.centeredView}>
      <StatusBar
        barStyle='dark-content'
        backgroundColor={Colors.DEFAULT_WHITE} />
      <Seperator height={StatusBar.currentHeight} />

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
  
  close: {
    top: 10,
    right:10
  },
  sectionContainer: {
    justifyContent: 'space-between',
    top: 250,
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
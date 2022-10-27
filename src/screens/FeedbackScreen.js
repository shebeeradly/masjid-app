import React, {useEffect} from "react";
import {
  StyleSheet, TextInput, View, StatusBar, TouchableOpacity, KeyboardAvoidingView
} from "react-native";
import { Seperator } from "../components";
import { Colors} from "../constants";
import { Display } from "../utils";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import Masjid from '../assets/images/masjidlog.svg';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Geolocation from 'react-native-geolocation-service';
import { PermissionsAndroid } from 'react-native';

const FeedbackScreen = ({ navigation }) => {
  const mapRef = React.createRef();

 const watchUserLocation = async () => {
    
        try {
          
          if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.requestMultiple(
              [
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
              ],
              {
                title: 'Masjid app',
                message: 'App access to your location',
              },
            );
            if (PermissionsAndroid.RESULTS.GRANTED) {
              console.log("location granted")
            } else {
              console.log('location permission denied');
            }
          }
        } catch (error) {
          console.log(error);
        }
      
  };

  useEffect(() => {
    if (watchUserLocation) {
      Geolocation.getCurrentPosition(
          (position) => {
            console.log(position.coords);
          },
          (error) => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  })

  return (
    <View style={styles.centeredView}>
      <StatusBar
        backgroundColor='transparent'
        barStyle='dark-content'
        translucent />
      <Seperator height={StatusBar.currentHeight} />

      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          ref={mapRef}
          style={styles.map}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
        >
        </MapView>
        <MaterialIcons
          style={styles.myLocationIcon}
          name="my-location"
          size={50}
          onPress={() => {
            mapRef.current.animateToRegion({
              latitude: 11.482483,
              longitude: 75.994465,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            });
          }}
        />
      </View>
      <KeyboardAvoidingView>
        <View style={styles.searchContainerMain}>
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
            style={styles.linearInput}>
            <View style={styles.inputSearchContainer}>
              <TouchableOpacity
                // onPress={() => navigation.openDrawer()}
                onPress={() => watchUserLocation()}>
                <FontAwesome name='bars' 
                size={27} style={{left:10}}
                color="#11F542" />
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
    ...StyleSheet.absoluteFillObject,
    width: '100%',
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
  myLocationIcon: {
    position: 'absolute',
    bottom: 100,
    right: 25,
    position: 'absolute',
    bottom: 50
  }

});

export default FeedbackScreen;
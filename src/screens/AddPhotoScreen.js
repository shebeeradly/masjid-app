import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, StatusBar, ImageBackground
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts, Images } from '../constants';
import { Display } from '../utils';
import { Seperator } from '../components';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const AddPhotoScreen = ({ navigation, route: {
  params: { masjidLocation, masjidName, description }
} }) => {

  const [active, setActive] = useState(true);
  const [getImage, setGetImage] = 
  useState('https://thumbs.dreamstime.com/b/jama-masjid-13274446.jpg');

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setGetImage(image.path);
      sheetRef.current.snapTo(1);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
      setGetImage(image.path);
      sheetRef.current.snapTo(1);
    });
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: "#E0FFE0",
        alignItems: 'center',
      }} >
      <View style={styles.panel}>

        <TouchableOpacity
          onPress={takePhotoFromCamera} >
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
            style={styles.logButton}>
            <Text style={styles.addBtnTxt}>Take Photo</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Seperator height={20} />

        <TouchableOpacity
          onPress={choosePhotoFromLibrary}>
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
            style={styles.logButton}>
            <Text style={styles.addBtnTxt}>Choose From Library</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Seperator height={20} />

        <TouchableOpacity
          onPress={() => sheetRef.current.snapTo(1) && setActive(true)}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
            style={styles.logButton}>
            <Text style={styles.addBtnTxt}>Cancel</Text>
          </LinearGradient>
        </TouchableOpacity>

      </View>

    </View>
  );

  const sheetRef = React.useRef(null);

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.DEFAULT_WHITE,
          opacity: active ? 1 : 0.3,
        }}
      >
        <StatusBar translucent
          backgroundColor={Colors.DEFAULT_WHITE}
          barStyle='dark-content' />
        <Seperator height={StatusBar.currentHeight} />
        <View style={styles.headerContainer}>
          <Ionicons
            name="chevron-back-outline"
            size={30}
            color='#40AFFF'
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerTitle}>Collection (Add Masjid)</Text>
        </View>
        <Seperator height={30} />
        <View style={styles.imageContainer}>
          <ImageBackground
            source={{
              uri: getImage,
            }}
            style={{ height: 200, width: 200 }}
            imageStyle={{ borderRadius: 15 }} />
        </View>
        <Seperator height={20} />
        <TouchableOpacity style={styles.changeButtonContainer}
          onPress={() => sheetRef.current.snapTo(0) && setActive(false)}
        >
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={['#11F542', '#40AFFF',]}
            style={styles.changeButton}>
            <Text style={styles.changeBtnTxt}>Change Image</Text>
          </LinearGradient>
        </TouchableOpacity>
        <Seperator height={20} />
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={22} />
          <Text style={styles.locationText}>{masjidLocation}</Text>
        </View>
        <Seperator height={10} />
        <View style={styles.locationContainer}>
          <FontAwesome5 name="mosque" size={15} />
          <Text style={styles.locationText}>{masjidName}</Text>
        </View>
        <Seperator height={10} />
        <View style={styles.locationContainer}>
          <MaterialIcons name="description" size={20} />
          <Text style={styles.locationText}>{description}</Text>
        </View>
      </View>
      <BottomSheet
        initialSnap={0}
        ref={sheetRef}
        snapPoints={[230, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />

    </>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panel: {
    padding: 20,
    backgroundColor: '#E0FFE0',
    paddingTop: 10,
  },
  logButton: {
    backgroundColor: Colors.SECONDARY_GREEN,
    height: Display.setHeight(7),
    width: Display.setWidth(77),
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  addBtnTxt: {
    color: Colors.SECONDARY_WHITE,
    fontSize: 17,
    fontFamily: Fonts.POPPINS_MEDIUM,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 17,
    fontFamily: Fonts.POPPINS_MEDIUM,
    lineHeight: 17 * 1.4,
    width: Display.setWidth(77),
    textAlign: 'center',
    color: '#11F542',
    left: 50
  },
  Card: {
    height: Display.setHeight(13),
    width: Display.setWidth(90),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginHorizontal: 20
  },
  titleText: {
    fontSize: 15,
    fontFamily: Fonts.POPPINS_MEDIUM,
    color: Colors.DEFAULT_WHITE,
    textAlign: 'center'
  },
  locationText: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 14,
    marginLeft: 20,
    lineHeight: 14 * 1.4
  },
  locationContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    alignItems: 'center',
  },
  changeButton: {
    height: Display.setHeight(5),
    width: Display.setWidth(50),
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center'
  },
  changeButtonContainer: {
    alignItems: 'center'
  },
  changeBtnTxt: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: 15
  },
  imageContainer: {
    alignItems: 'center'
  }

});

export default AddPhotoScreen;
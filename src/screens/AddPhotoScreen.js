import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts } from '../constants';
import { Display } from '../utils';
import { Seperator } from '../components';
import ImagePicker from 'react-native-image-crop-picker';

const AddPhotoScreen = () => {

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: 300,
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
          onPress={() => sheetRef.current.snapTo(1)}
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
          backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Button
          title="Open Bottom Sheet"
          onPress={() => sheetRef.current.snapTo(0)}
        />
      </View>
      <BottomSheet
        initialSnap={1}
        ref={sheetRef}
        snapPoints={[300, 0]}
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
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
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

});

export default AddPhotoScreen;
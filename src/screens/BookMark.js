import React from 'react';
import {
   View, ScrollView, StyleSheet, TextInput, StatusBar, FlatList, TouchableOpacity 
 } from 'react-native';
import { MainCard, Seperator, MainCard1, MainCard2 } from '../components';
import LinearGradient from 'react-native-linear-gradient';
import { Colors, Fonts } from '../constants';
import { Display } from '../utils';
import Masjid from '../assets/images/masjidlog.svg';
import LeftArrow from '../assets/images/leftarrow.svg';
import General from '../constants/General';

const BookMark = ({navigation}) => {

  return (
    <View style={styles.main}>
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
            onPress={() => navigation.navigate('Profile')} >
            <LeftArrow width={30} height={30} marginHorizontal={3} />
            </TouchableOpacity>
            <TextInput placeholder='Search here'
              style={styles.searchTxtInput} />
            <Masjid width={40} height={40} marginHorizontal={5} />
          </View>
        </LinearGradient>
      </View>
      <Seperator height={30} />

      <ScrollView style={styles.main}>
        <View style={styles.firstFlat}>
          <FlatList
            data={General.WELCOME_CONTENTS}
            keyExtractor={item => item.image}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <MainCard {...item} />}
          />
        </View>

        <Seperator height={10} />

        <View style={styles.firstFlat}>
          <FlatList
            data={General.WELCOME_CONTENTS}
            keyExtractor={item => item.image}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <MainCard1 {...item}
            onPress={() => navigation.navigate('Collection')} />}
          />
        </View>

        <Seperator height={10} />

        <View style={styles.firstFlat}>
          <FlatList
            data={General.WELCOME_CONTENTS}
            keyExtractor={item => item.image}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => 
            <MainCard2 {...item} />}
          />
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }, main: {
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
  firstFlat: {
    flex: 1,
  }
});

export default BookMark;
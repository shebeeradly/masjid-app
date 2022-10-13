import React from 'react';
import { View, StyleSheet, StatusBar, TouchableOpacity} from 'react-native';
import { Colors} from '../constants';
import Masjid from '../assets/images/masjidlog.svg';



const SplashScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <StatusBar barStyle='dark-content'
        backgroundColor={Colors.DEFAULT_WHITE} />
      <TouchableOpacity
      onPress={() => navigation.navigate('Welcome')}>
      < Masjid width={200} height={200} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.DEFAULT_WHITE
  },
});

export default SplashScreen;
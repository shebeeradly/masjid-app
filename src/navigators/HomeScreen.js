import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Bookmark from '../assets/images/bookmark.svg';
import Collection from '../assets/images/collection.svg';
import Icosettings from '../assets/images/icosettings.svg';
import LinearGradient from 'react-native-linear-gradient';
import { View, Image } from 'react-native';
import { BookMark,ProfileScreen, SettingScreen } from '../screens';
import CollectionMainScreen from './CollectionMainScreen';
import { Images } from '../constants';
// import Homesvg from '../assets/images/home.svg';
// import Icoprofile from '../assets/images/icoprofile.svg';

const Tab = createBottomTabNavigator();

function HomeScreen() {
  return (
    <Tab.Navigator 
    screenOptions={{headerShown: false ,
     tabBarBackground: () => (
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#11F542", "#40AFFF"]}
          style={{ height: 50 }}
        />
      </View>
    ),
     }} >
      <Tab.Screen name="Profile" component={ProfileScreen}
         options={{tabBarShowLabel: false , tabBarIcon: ({focused, size}) =>(
          <Image source={Images.HOME} height={30} width={30} />
         )}} />
      <Tab.Screen name="Book" component={BookMark}
      options={{tabBarShowLabel: false , tabBarIcon: ({focused, size}) =>(
        <Bookmark width={23} height={23} />
       )}} />
      <Tab.Screen name="CollectionMain" component={CollectionMainScreen} 
      options={{tabBarShowLabel: false , tabBarIcon: ({focused, size}) =>(
        <Collection width={23} height={23} />
       ), tabBarStyle:{display:'none'}, }} />
      <Tab.Screen name="Settings" component={SettingScreen} 
      options={{tabBarShowLabel: false , tabBarIcon: ({focused, size}) =>(
        <Icosettings width={23} height={23} />
       )}} />
    </Tab.Navigator>
  );
}

export default HomeScreen;
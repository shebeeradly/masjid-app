import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AddPhotoScreen, CollectionScreen } from '../screens';

const Stack = createNativeStackNavigator();

const CollectionMainScreen = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false}} 
      initialRouteName="Collection">
      <Stack.Screen name="Collection" component={CollectionScreen}  />
      <Stack.Screen name="AddPhoto" component={AddPhotoScreen}  />
    </Stack.Navigator>
  );
};


export default CollectionMainScreen;
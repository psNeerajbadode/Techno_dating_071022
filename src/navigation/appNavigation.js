import {StyleSheet} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthNavigation from './authNavigation';
import HomeNavigation from './homeNavigation';

const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="authNavigation" component={AuthNavigation} />
      <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
    </Stack.Navigator>
  );
};

export default AppNavigation;

const styles = StyleSheet.create({});

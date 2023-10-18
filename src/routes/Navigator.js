import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import RNBootSplash from 'react-native-bootsplash';
import {SplashScreen, Login, SignUp, Home} from '../screens';

const Stack = createNativeStackNavigator();

export default function Navigator() {
  return (
    <NavigationContainer onReady={() => RNBootSplash.hide({fade: true})}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          statusBarTranslucent: true,
          statusBarColor: 'transparent',
        }}>
        <Stack.Screen component={SplashScreen} name="SplashScreen" />
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={SignUp} name="SignUp" />
        <Stack.Screen component={Home} name="Home" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

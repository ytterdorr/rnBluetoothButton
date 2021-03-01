import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import StartView from "./src/views/StartView";
import ClickView from './src/views/ClickView';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator initialRouteName="Clicker">
      <Stack.Screen
        name="Start"
        component={StartView}
      />
      <Stack.Screen
        name="Clicker"
        component={ClickView}
      />
    </Stack.Navigator>
  )
}


const App = () => {
  return (
    <>
      <NavigationContainer>
        <StatusBar barStyle="dark-content" />
        <MyStack />
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    backgroundColor: "white",
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
});

export default App;

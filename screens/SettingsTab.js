import React, { Component, useState } from "react";
import { StyleSheet, View, Text, Switch, FlatList, Button } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';

import Colors,{setPallette} from '../constants/Colors';
import Layout from '../constants/Layout';
import Preferences from '../constants/Preferences';


import {messageInit} from '../components/firebaseAuth';

class Settings extends React.Component {


  toggleSwitch = (stateKey) => {
    Preferences[stateKey] = !Preferences[stateKey];
    setPallette();
    console.log(Colors);
    this.forceUpdate();
  };

  settings = [
    {
      title: 'Dark Mode',
      stateKey: 'darkMode'
    },
    {
      title: 'Dark Mode',
      stateKey: 'darkMode'
    },
    {
      title: 'Dark Mode',
      stateKey: 'darkMode'
    },
    {
      title: 'Dark Mode',
      stateKey: 'darkMode'
    },
    
  ]

  render() {
    return (
      <View style={styles.container}>
        <Button title = "press to allow notifications" onPress={()=> messageInit()}/>
       

      </View>

    );
  }
}

const SettingsStack = createStackNavigator();

export default function SettingStackScreen() {
  return (
    <SettingsStack.Navigator initialRouteName="Settings" screenOptions={Layout.headerScreenOptions}>
      <SettingsStack.Screen component={Settings} name="Settings" options={{ headerTitle: 'Settings' }} />
    </SettingsStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  row: {
    flexDirection:'row',
    alignItems:"center",
    height: 70,
    width:Layout.window.width,
    paddingHorizontal: 30
  },
  text: {
    textAlign:'left',
    flex: 2,
    fontFamily:'textFont-regular',
    fontSize: 16
  },
  switch: {
    flex: 1,
    alignItems:'flex-end'
  },
  divider: {
    backgroundColor:'#CDCDCD',
    height: 1,
    width:Layout.window.width
  }
})


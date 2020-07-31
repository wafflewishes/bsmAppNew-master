import React, { Component } from "react";
import { StyleSheet, View, Image, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Colors from '../constants/Colors';
function WeeklyButton(props) {
    const navigation = useNavigation();  

  return (
    <View>
        <TouchableOpacity style={styles.container}
            onPress = {() => navigation.navigate('Week',{})}
            activeOpacity={0.6}

        >
            <Text style={styles.text}>Our Weekly Schedule</Text>
            <Text style={styles.arrow}>+</Text>

        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
      height: 50,
      backgroundColor: Colors.lightGold,
      alignItems: 'center',
      justifyContent:'center',
      flexDirection:'row'
  },
  text:{
      flex:3,
      color: 'white',
      fontFamily: 'titleFont',
      fontSize: 21,
      //backgroundColor: 'red',
      textAlign: 'center'
      
  },
  arrow:{
    flex:1,
    color: 'white',
    fontFamily: 'titleFont',
    fontSize: 35,
    textAlign: 'center'

   // backgroundColor: 'blue'

  }
});

export default WeeklyButton;

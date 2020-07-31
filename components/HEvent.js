import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity, ImageBackground } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Colors } from "react-native/Libraries/NewAppScreen";
import Col from '../constants/Colors';
import Layout from "../constants/Layout";



function HEvent(props) {
  const navigation = useNavigation();  

  return (
    <View style={[styles.container, props.style]}>
      <TouchableOpacity onPress = {() => {
        navigation.navigate("EventPage", {color: Col.lightGold, event: props.event})
        
      }}
      activeOpacity={0.6}

      >
      <View style={styles.upcomingBox}>
        <ImageBackground
          source={props.event.thumbnail}
          resizeMode="cover"
          style={styles.picture}
          imageStyle={{opacity:0.4}}
        >
        
        <View style={styles.titleBox}>
          <Text style={styles.upcomingTitle} numberOfLines={2}>
            {props.event.title}
          </Text>
          <Text style={styles.upcomingDate} numberOfLines={2}>
          {props.event.period}
          </Text>
        </View>
        </ImageBackground>

  
       
      </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  upcomingBox: {
    width: 340,
    height: 240,
    backgroundColor: "black",
    shadowOffset: {
      width: 5,
      height: 5
    },
    shadowColor: Col.shadow,
    shadowOpacity: 0.16,
  },

  picture: {
    flex:10,
  },


  upcomingDate: {
    color: 'white',
    fontSize: 18,
    fontFamily: "textFont-bold",
    textAlign: "center",
  },

  titleBox:{
    flex: 1,
    opacity:1,
    alignItems:'center',
    justifyContent:'center',
    paddingHorizontal: 8

  },

  upcomingTitle: {
    
    color: "white",
    fontSize: 24,
    fontFamily: "titleFont",
    textAlign:'center'
  },


});

export default HEvent;


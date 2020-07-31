import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from "react-native";
import Layout from '../constants/Layout';

const styles = StyleSheet.create({
  row: {
    width: Layout.window.width,
    marginBottom: 1,
    padding: 8,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    color: "#fff",
    fontFamily:'textFont-bold',
    textAlign:'center'
  }
});

export const RowItem = ({ onPress = () => { }, name, color, image }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
  <ImageBackground source = {image} imageStyle={{opacity:0.1}} resizeMode='cover' style={{width:'100%', backgroundColor: color, height: 150, justifyContent:'center'}}>

      <View style={[styles.row]}>
        <Text style={styles.text} numberOfLines={2}>{name}</Text>      
      </View>
  </ImageBackground>
  </TouchableOpacity>

  
);

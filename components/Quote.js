import React, { Component } from "react";
import { StyleSheet, View, Image, ImageBackground, Text } from "react-native";
import Layout from '../constants/Layout';



function Quote(props) {
  var colour = "tomato"
  switch (props.seed){
    case 1:
      colour = '#5c84ea'
      break;
    case 2:
      colour = '#965de8'
      break;
    case 3:
      colour = '#e26095'
      break;
    case 4:
      colour = '#5c84ea'
      break;  
    default:
      colour = "#d16666"
      break;
  }

  return (
    <View style = {[styles.container, {backgroundColor: colour}]}>
      <ImageBackground source={require('../assets/images/QuoteTall.png')}
        resizeMode = 'contain'
        style = {styles.box}>
          <View style = {styles.quoteArea}>
            <Text style = {styles.text}>{props.set.quote} </Text>
          </View>
          <View style = {styles.authorArea}>
            <Text style = {styles.author}>- {props.set.author}</Text>
          </View>

          
      </ImageBackground>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: Layout.content.height + 40,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.16,

    marginVertical: 6,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  box:{
    flex: 1,
    margin: 11,
    paddingHorizontal: 40,
    paddingVertical: 40,
    alignContent:'center',
    justifyContent:'center'
    
  },

  text:{
    fontFamily: 'textFont-bolditalic',
    fontSize: 22,
    lineHeight: 25,
    textAlign: 'center',
    color: 'white',
    justifyContent: 'center'
    
  },
  author:{
    fontFamily: 'textFont-regular',
    fontSize: 20,
    color: 'white',
    textAlign: 'center',

  },
  quoteArea:{
    justifyContent: "center",
    flex: 8,
  },
  authorArea:{
    justifyContent: "center",
    flex: 2,
  }

});

export default Quote;

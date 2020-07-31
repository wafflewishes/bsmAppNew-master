import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity,Animated } from "react-native";
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

function Regular(props) {

  var anim = new Animated.Value(0);
  const loadDuration = 500;
  
  function loadImage(){
    Animated.timing(anim, {
      toValue:1,
      duration: loadDuration
    }).start();
  }

  const navigation = useNavigation();  
  return (
    <View style={[styles.container, props.style]
    }>
      <TouchableOpacity onPress = {() =>
        navigation.navigate("EventPage", props)
      }
      style={{flex:1}}
      activeOpacity={0.6}

      >

      <View style={styles.boxStack}>

        <View style={styles.picture}>
          <Animated.Image
            source={props.event.thumbnail}
            resizeMode="cover"
            style={{height:'100%', width:'100%', opacity: anim}}
            onLoad={() => loadImage()}
          ></Animated.Image>
        </View>

        <View style={styles.textBox}>
          <View style={styles.titleBox}>
            <Text numberOfLines = {1} style={styles.title}>{props.event.title}</Text>
          </View>
          {timeBox()}
          <View style={[styles.titleBox, {flex: 7}]}>
            <Text style={styles.description} numberOfLines={2}>{props.event.description}</Text>
          </View>

        </View>

      </View>
      
      
      </TouchableOpacity>
    </View>
  );


  function timeBox(){
    if(props.event.startTime != ""){
      return(
      <View style={[styles.titleBox, {flex: 3}]}>
        <Text style={styles.time}>{moment(props.event.startTime, "h:mm").format('h:mm a')} </Text>
      </View>);
    }
    else if(props.event.status == 'past'){
      return(
      <View style={[styles.titleBox, {flex: 3}]}>
        <Text style={styles.time}>{props.event.commonStartDate} </Text>
      </View>
      );
    }
    else if (props.event.status == 'ongoing'){
      
        return(
          <View style={[styles.titleBox, {flex: 3}]}>
            <Text style={styles.time}>{props.event.period} </Text>
          </View>
          );
    }
    else return;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    
  },

  picture: {
   flex: 4
  },
  textBox: {
    flex: 8,
    alignItems: "stretch",
    flexWrap: "nowrap",
    justifyContent: "center",
    paddingHorizontal: 8,
    
  },

  titleBox:{
    flex:5,
    justifyContent:'center',
    alignContent:'center'
  },

  title: {
    color: "rgba(0,95,168,1)",
    fontSize: 18,
    fontFamily: "titleFont-regular",
    justifyContent:'center',


  },
  time: {
    color: "rgba(0,0,0,1)",
    opacity: 0.9,
    fontSize: 16,
    fontFamily: "textFont-semiBold",

  },
  description: {
    color: "rgba(0,0,0,1)",
    opacity: 0.9,
    fontSize: 13,
    fontFamily: "textFont-regular",

  },
  divider: {
    flex:1,
    backgroundColor: "rgba(0,0,0,0.41)",
  },

  boxStack: {
    flex: 1,
    flexDirection:'row'
  }
});

export default Regular;

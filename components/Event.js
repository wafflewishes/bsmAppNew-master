import React, { Component } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Linking, ImageBackground } from "react-native";
import moment from 'moment';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import { useNavigation } from '@react-navigation/native';
import ImageLoader from './ImageLoader';
import { LinearGradient } from "expo-linear-gradient";
import { color } from "react-native-reanimated";


var today = moment().format();

function Event(props) {
  const navigation = useNavigation();

  if (props.event.status == 'week') {
    return (
      <View style={{
        shadowOffset: {
          height: 5,
          width: 5
        },
        shadowColor: "rgba(0,0,0,1)",
        shadowOpacity: 0.16,

        flex: 3,
        margin: 6,
        alignItems: 'center',
      }}>
        <View style={{
          width: Layout.content.width,
          height: Layout.content.height - 150,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'stretch',
        }}>
          <View style={{ flex: 4, backgroundColor: 'white', alignItems: "center", justifyContent: "center" }}>
            <Text style={[styles.title,]} numberOfLines={1}>{props.event.title}</Text>
            <Text style={[styles.date,]}>{props.event.commonStartDate}</Text>
          </View>
          <View style={{ flex: 11, alignItems: "center" }}>
            <ImageLoader
              style={{ flex: 1, width: '100%', backgroundColor: Colors.background }}
              source={props.event.thumbnail}
              resizeMode="cover"
            />
          </View>
        </View>
      </View>
    );

  }

  if (props.event.status == 'media') {
    return (
        <TouchableOpacity onPress={() => { Linking.openURL(props.event.link) }} activeOpacity={0.7} style={[styles.ImageBox, props.style]}>
          <ImageBackground source={props.event.thumbnail} resizeMode='cover' imageStyle={{borderRadius: props.borderRadius}} blurRadius={10} style={[{ flex:1}]}>
            <Image
              style={{ flex: 1 }}
              source={props.event.thumbnail}
              resizeMode="contain"
            />
            <View style={{ flexShrink: 1, backgroundColor: 'rgba(0,0,0,0.7)', paddingVertical: 6, borderBottomEndRadius: props.borderRadius, borderBottomStartRadius:props.borderRadius }}>
              <Text numberOfLines={1} style={[styles.title, { color: 'white', textAlign: 'center', marginBottom: 6 }]}>{props.event.title}</Text>
              <Text style={[styles.date, { color: 'white', textAlign: 'center' }]}>{props.event.commonStartDate}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
    );
  }

  else if (props.event.description.length <= 0) {
    return (
      <View style={{
        shadowOffset: {
          height: 5,
          width: 5
        },
        shadowColor: "rgba(0,0,0,1)",
        shadowOpacity: 0.16,

        flex: 3,
        margin: 6,
        alignItems: 'center',
      }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EventPage", { color: props.event.color, event: props.event })
          }

        >

          <View style={{
            width: Layout.content.width,
            height: Layout.content.height,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}>
            <View style={{ flex: 6, backgroundColor: 'white', alignItems: "center", justifyContent: "center" }}>
              <Text style={styles.title} numberOfLines={1}>{props.event.title}</Text>
              <Text style={styles.date}>{props.event.commonStartDate}</Text>
            </View>
            <View style={{ flex: 25, backgroundColor: 'skyblue', alignItems: "center" }}>
              <Image
                style={{ flex: 1, width: '100%' }}
                source={props.event.thumbnail}
                resizeMode="cover"
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }


  else
    return (
      <View style={{
        shadowOffset: {
          height: 5,
          width: 5
        },
        shadowColor: "rgba(0,0,0,1)",
        shadowOpacity: 0.16,

        flex: 3,
        margin: 6,
        alignItems: 'center',
      }}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EventPage", { color: props.event.color, event: props.event })
          }
          activeOpacity={0.6}
        >

          <View style={{
            width: Layout.content.width,
            height: Layout.content.height,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'stretch',
          }}>
            <View style={{ flex: 6, backgroundColor: 'white', alignItems: "center", justifyContent: "center" }}>
              <Text style={styles.title} numberOfLines={1}>{props.event.title}</Text>
              <Text style={styles.date}>{props.event.commonStartDate}</Text>
            </View>
            <View style={{ flex: 25, backgroundColor: 'skyblue', alignItems: "center" }}>
              <Image
                style={{ flex: 1, width: '100%' }}
                source={props.event.thumbnail}
                resizeMode="cover"
              />
            </View>
            <View style={{ flex: 6, backgroundColor: 'white', alignItems: "center", justifyContent: 'center' }}>
              <Text style={styles.desc} numberOfLines={2}>{props.event.description}</Text>
            </View>
          </View>
        </TouchableOpacity>

      </View>
    );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "titleFont",
    color: Colors.titleColour,
    marginHorizontal: 6
  },
  date: {
    fontSize: 16,
    fontFamily: "textFont-semiBold",
  },
  desc: {
    fontFamily: "textFont-regular",
    fontSize: 14,
    marginHorizontal: 10,
    marginVertical: 6
  },
  ImageBox: {
    width: Layout.window.width,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.16,
    flex: 3,
  
  
  }
});

export default Event;

/**
 *           <View >
            <Text style = {[styles.title, {fontSize: 18}]} numberOfLines={1}>{props.event.title}</Text>
            <Text style = {[styles.date, {fontSize: 14, marginHorizontal: 6}]}>{props.event.commonStartDate}</Text>
          </View>
 *
 */
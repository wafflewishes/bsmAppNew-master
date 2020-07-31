import React from "react";
import { StyleSheet, View,Text,TouchableOpacity } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import VideosTab from './Media/VideosTab';
import MusicTab from './Media/MusicTab';
import LiveStreamTab from './Media/LiveStreamTab';
import PodcastTab from './Media/PodcastTab';

import {FontAwesome5} from '@expo/vector-icons';

class MediaHome extends React.Component{

    buttons = [
      {
        key: 0,
        title: 'Music',
        color: Colors.community,
        icon: 'music'

      },
      {
        key: 1,
        title: 'Podcasts',
        color: Colors.multiple,
        icon: 'microphone-alt'

      },
      {
        key: 2,
        title: 'Videos',
        color: Colors.special,
        icon: 'video'

      },
      {
        key: 3,
        title: 'Live Streams',
        color: Colors.today,
        icon: 'play-circle'

      },

    ]

    render(){
        return(
        <View style = {styles.container}>
            {this.buttons.map( item =>             
              <TouchableOpacity onPress={() => this.props.navigation.navigate(item.title, {})} style = {styles.buttonBox} key={item.key}>
              <View style = {[styles.button, {backgroundColor:item.color}]}>
                  <FontAwesome5
                       name= {item.icon}
                       size= {70}
                       color='black'
                  />
                  <Text style = {styles.Text}>{item.title}</Text>
                </View>
              </TouchableOpacity>
              )}
        </View>

        );
    }
  }

const MediaStack = createStackNavigator();

export default function MediaStackScreen() {
  return(
    <MediaStack.Navigator  initialRouteName = "MediaHome" screenOptions={Layout.headerScreenOptions}>
        <MediaStack.Screen component = {MediaHome} name = "MediaHome" options={{headerTitle:'Media', headerTitleStyle:{fontSize:18}}}/>
        <MediaStack.Screen component = {MusicTab} name = "Music" options={{ headerTitleStyle:{fontSize:18}}}/>
        <MediaStack.Screen component = {PodcastTab} name = "Podcasts" options={{ headerTitleStyle:{fontSize:18}}}/>
        <MediaStack.Screen component = {LiveStreamTab} name = "Live Streams" options={{headerTitleStyle:{fontSize:18}}}/>
        <MediaStack.Screen component = {VideosTab} name = "Videos" options={{headerTitleStyle:{fontSize:18}}}/>



    </MediaStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container:{
    height:'100%',
    width: Layout.window.width,
    flexWrap:'wrap',
    alignContent:'stretch',
    flexDirection:'row'


  },
  buttonBox:{
    
    width:Layout.window.width/2,
    justifyContent:'center',
    padding: 10,
    shadowColor:'black',
    shadowOffset:{
      height: 3,
      width: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2
    

  },
  button:{
    flex: 1,
    justifyContent:'space-evenly',
    alignItems:'center',
    borderRadius: 15,
    paddingVertical: '4%'
  },
  Text:{
    fontFamily:'titleFont',
    color:Colors.grey,
    fontSize:24
  }
})

/*

     <TouchableOpacity onPress={() => this.props.navigation.navigate('Music', {})} style = {styles.buttonBox}>
          <View style = {[styles.button, {backgroundColor:Colors.community}]}>
              <Text style = {styles.Text}>Music</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Podcasts', {})} style = {styles.buttonBox}>
          <View style = {[styles.button, {backgroundColor:Colors.multiple}]}>
              <Text style = {styles.Text}>Podcasts</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Videos', {})} style = {styles.buttonBox}>
            <View style = {[styles.button, {backgroundColor:Colors.special}]}>
              <Text style = {styles.Text}>Videos</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Live Streams', {})} style = {styles.buttonBox}>
          <View style = {[styles.button, {backgroundColor:Colors.today}]}>
              <Text style = {styles.Text}>Live Streams</Text>
            </View>
          </TouchableOpacity>

*/
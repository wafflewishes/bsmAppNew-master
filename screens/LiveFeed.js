import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text, } from "react-native";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';



import TodayContent from "../components/TodayContent";
import { createStackNavigator } from '@react-navigation/stack';
import SideSwiper from "../components/SideSwiper";

import { PastEventList, QuoteList, pastEvents,EventList } from '../components/firebaseAuth';
import ImageLoader from '../components/ImageLoader';

import { MaterialIcons } from '@expo/vector-icons';


import Colors from '../constants/Colors';
import moment from 'moment';

import Quiz from './Quiz';
import Week from './Week';
import Web from './Web';

import EventPage from './EventPage';
import HEvent from "../components/HEvent";
import { Feed } from "../components/Feed";
import Layout from "../constants/Layout";
import CalendarStackScreen from "./CalendarScreen";


var quoteSet = {};




export class LiveFeed extends React.Component {
  constructor(props) {
    super(props);
    //this.loadFeed = this.loadFeed.bind(this);
    var tod = moment().endOf('day').fromNow();
    var now = moment();

    this.state = { feed: PastEventList };
    this.loadHeader = this.loadHeader.bind(this);


    var timeFromDayStart = now - moment().startOf('day');
    var timeToDayEnd = moment().endOf('day') - now;
    if (timeFromDayStart < timeToDayEnd) {
      quoteSet = QuoteList.Morning;
    }
    else {
      if (timeToDayEnd < moment().startOf('day').add(12, 'hours')) {
        quoteSet = QuoteList.Night;
      }
      else {
        quoteSet = QuoteList.Afternoon;
      }
    }

  }

  /*loadFeed = () => {
      for (let index = 0; index < MAXSTRINGLENGTH; index++) {
        if(PastEventList[counter].type == 'Past Event'){
          feed.push({type: "Event", item: PastEventList[counter], key:JSON.stringify(key)});
        }
        key++;
        counter++;
        
      }
      feed.push({type: "Trivia", key: JSON.stringify(key)});
      key++;
      feed.push({type: 'Quote', quote: quoteSet[quoteCounter], key: JSON.stringify(key)});
      quoteCounter++;
      key++;
      
      this.setState({feed: feed})

  } */
  loadHeader = () => {
    return (
        <TodayContent />)
  }

  render() {
    if(EventList.length <= 1) this.props.navigation.navigate('Offline', {});

    return (
      <View
        style={{ height: '100%', width:'100%' }} bounces={false}

      >
        <SideSwiper header = {this.loadHeader}/>
       
      </View>

    );
  }
}

const FeedStack = createStackNavigator();
const HomeStack = createMaterialTopTabNavigator();

export default function FeedStackScreen() {
  return (
    <FeedStack.Navigator initialRouteName="Home" screenOptions={Layout.headerScreenOptions}>
      <FeedStack.Screen name="Home" component={LiveFeed} options={{ headerTitle: homeHeader }} />
      <FeedStack.Screen name="EventPage" component={EventPage} options={({ route }) => { if (route.params.event.status == 'past') return { title: 'Past Event' }; else  if (route.params.event.status == 'ongoing') return { title: 'Ongoing Event' }; else return { title: route.params.event.title } }} />
      <FeedStack.Screen name="Web" component={Web} options={({ route }) => ({ title: '' })} />
    </FeedStack.Navigator>
  );
}

export function homeHeader() {
  return (

    <ImageLoader
      style={{ width: 50, height: 50, tintColor: 'rgba(255,255,255,0.9)' }}
      source={require('../assets/images/whitePlain.png')}
      resizeMode='contain'
    />

  );
}




const styles = StyleSheet.create({

  feedContainer: {
    width: "100%",
    height: 800,

  },
  todayText: {
    color: 'white',
    alignSelf: "stretch",
    fontSize: 24,
    margin: 20,
    fontFamily: "titleFont",
    textAlign: "center",
  },
 

});
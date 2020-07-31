import React, { Component, useState } from "react";
import { StyleSheet, View, Text, FlatList, Animated } from "react-native";
import Regular from "./Regular";
import moment from 'moment';
import {WeeklyList, PastEventList, EventList} from './firebaseAuth';
import Colors from "../constants/Colors";
import { ScrollView } from "react-native-gesture-handler";
import Layout from "../constants/Layout";
import Animations from '../constants/Animations';
const TODAY = moment().format();

const TITLE_DURATION = Animations.timing.title;
const EVENT_DURATION = Animations.timing.componant;

var day = moment().format('MMMM Do[,] YYYY');
var eventData = [];
var count;

 class TodayContent extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {loaded: false, weeklyList: WeeklyList};
    this.loadToday = this.loadToday.bind(this);
    this._fade = new Animated.Value(0);
    this._size = new Animated.Value(0.5);
    this._rise = new Animated.Value(10);
    this._componant = new Animated.Value(0);
  }

  componentDidMount(){
    this.loadToday();
    this.Animate();
  }

  Animate = () => {
    Animated.sequence([
      Animated.delay(Animations.loadDelay),
      Animated.parallel([
        Animated.timing(this._fade,{
          toValue: 1,
          duration: TITLE_DURATION/3
        }),
        Animated.timing(this._size,{
          toValue: 1.05,
          duration: TITLE_DURATION/3
        }),
        Animated.timing(this._rise,{
          toValue: 0,
          duration: TITLE_DURATION/3
        }),
      ]),
      Animated.timing(this._size,{
        toValue: 1,
        duration: TITLE_DURATION/6,
      }),
    ]).start(() => this.AnimateComponant());
  }

  AnimateComponant = () => {
    Animated.timing(this._componant,{
      toValue: 1,
      duration: EVENT_DURATION,
    }).start();
  }

  loadToday(){
   if(!this.state.loaded){
    this.state.weeklyList.sort((a,b) => moment(a.startTime, 'hh:mm') - moment(b.startTime,'hh:mm'));
    this.state.weeklyList.forEach(element => 
      {if(eventData.filter(e => e == element).length == 0 && element.startDate != null){
      eventData.push(element);
      console.log(element);

    }},
      );
      this.setState({loaded: true});
    }
    
    return;
  }

  header = () =>{
    const animStyle = [ styles.todayWords,
      {opacity: this._fade},
      {transform: [{translateY: this._rise.interpolate({
        inputRange: [0,1],
        outputRange: [-1, 0],

      },
        )},{scale: this._size} ]}
    ]
    return (
            <Animated.View style = {animStyle}>
              <Text style={styles.todayText}>Today's Events</Text>
              <Text style={styles.todayDate}>{day}</Text>
              <View style={styles.todayMiddleBar}></View>
            </Animated.View>

    );

  }

  render(){
    if(eventData.length > 0)
      return (
          <View style = {{ backgroundColor: "rgba(124,185,231,1)" }}>
              {this.header()}
            <Animated.FlatList
              data = {eventData}
              horizontal={false}
              style = {{opacity: this._componant, width:Layout.window.width, alignItems:'center'}}
              contentContainerStyle = {styles.todayContainer}
              scrollEnabled={false}
              keyExtractor={(item,index) => item.key}
              showsVerticalScrollIndicator={true}
                renderItem={({ item }) => (
                  <Regular
                    event = {item}
                    style = {styles.today2}
                    color = {Colors.lightGold}
                  />                
              )}
              ListFooterComponent={() => {return(<View style = {{backgroundColor: Colors.lightBlue, height: 20}}/>);}}
              />
          </View>
      ) ;
    else return (
      <View style={styles.todayContainer}>
        <View style={[styles.todayWords, {flex: 1}]}>
          <Text style={styles.todayText}>Today's Events</Text>
          <Text style={styles.todayDate}>{day}</Text>
          <View style={styles.todayMiddleBar}></View>
        </View>
        <View style={{height: 100, justifyContent:"center", alignContent:'center', backgroundColor: "rgba(124,185,231,1)", width:Layout.window.width}}>
          <Text style = {styles.noEvents}>There are no events {'\n'}scheduled for today.</Text>
        </View>
      </View>
  ) ;
    }  
}

const styles = StyleSheet.create({
  todayContainer: {
    width: Layout.window.width,
    flexGrow:0,
    alignItems: "center",
    borderBottomWidth:6,
    borderBottomColor: 'rgba(124,185,231,1)'
  },
  listStyle:{
    flex:1,
    justifyContent: 'center'
  },
  todayWords: {
    width: "100%",
    height: 90,
    paddingTop: 16,
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "rgba(124,185,231,1)",
  },
  todayText: {
    color: "rgba(255,255,255,1)",
    alignSelf: "stretch",
    fontSize: 24,
    fontFamily: "titleFont",
    textAlign: "center"
  },
  todayDate: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center",
    fontSize: 35,
    fontFamily: "titleFont",
    textAlign: "center"
  },
  todayMiddleBar: {
    width: 211,
    height: 7,
    marginBottom: 12,
    marginTop: 6,
    backgroundColor: "rgba(255,255,255,1)"
  },
  today2: {
    width: 350,
    height: 90,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.16,
    marginTop: 16,
    
  },

  noEvents:{
    fontFamily:'textFont-italic',
    fontSize: 20,
    color: 'white',
    textAlign:'center',
    opacity:0.9
  }
});

export default TodayContent;

import React, { Component } from "react";
import { StyleSheet, View,Text } from "react-native";
import { createStackNavigator } from '@react-navigation/stack';

import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

import Quote from '../components/Quote';
import {QuoteList} from '../components/firebaseAuth';
import QuizRowItem from '../components/QuizRowItem';
import Quiz from './Quiz';

import {homeHeader} from './LiveFeed';
import moment from 'moment';
import { ScrollView } from "react-native-gesture-handler";

var quoteSet;
class FunHome extends React.Component{

    constructor(props){
      super(props);
      var now = moment();
      var timeFromDayStart = now - moment().startOf('day');
      var timeToDayEnd = moment().endOf('day') - now;
      if(timeFromDayStart < timeToDayEnd){
        quoteSet = QuoteList.Morning;
      }
      else {
        if(timeToDayEnd < moment().startOf('day').add(12, 'hours')){
          quoteSet = QuoteList.Night;
        }
        else{
          quoteSet = QuoteList.Afternoon;
        }
      }
    }

    render(){
        return(
        <ScrollView contentContainerStyle = {styles.container}>
         
            <View style = {{backgroundColor:Colors.today, width:Layout.window.width}}>
            <Text style = {styles.label}>Quiz of the Day</Text>
          </View>
            <QuizRowItem seed = {0}/>
            <View style = {{backgroundColor:Colors.today, width:Layout.window.width}}>
            <Text style = {styles.label}>Quote of the Day</Text>
          </View>
            <Quote set={quoteSet[0]} seed = {0}/>
        </ScrollView>

        );
    }
  }

const FunStack = createStackNavigator();

export default function FunStackScreen() {
  return(
    <FunStack.Navigator  initialRouteName = "FunHome" screenOptions={Layout.headerScreenOptions}>
        <FunStack.Screen component = {FunHome} name = "FunHome" options={{headerTitle:'Entertainment'}}/>
        <FunStack.Screen name="Quiz" component={Quiz} options={({ route }) => ({ title: route.params.title })}/>

    </FunStack.Navigator>
  );
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
    },
    label:{
      color: 'white',
      alignSelf: "stretch",
      fontSize: 24,
      margin: 20,
      fontFamily: "titleFont",
      textAlign: "center",
    }
})


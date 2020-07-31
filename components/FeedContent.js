import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import Event from "./Event";
import Quote from "./Quote";

import QuizRowItem from './QuizRowItem';
import { useNavigation } from '@react-navigation/native';


import vishnuLakshmiQuestions from "../assets/data/vishnuLakshmi";
import ramayanQuestions from "../assets/data/ramayan";
import hanumanQuestions from "../assets/data/hanuman";
import shivaQuestions from "../assets/data/shiva";
import generalQuestions from "../assets/data/general";


function FeedContent (props){

      return (
        <View style={styles.container}>
          <QuizRowItem/>          
          <Event style={styles.content}></Event>
          <QuizRowItem/>
          <Quote style={styles.content}></Quote>
          <QuizRowItem/>

        </View>
      );
    
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12
  },
  content: {
    width: 345,
    height: 290,
    shadowOffset: {
      height: 5,
      width: 5
    },
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.16,
    margin: 6
  },

});

export default FeedContent;

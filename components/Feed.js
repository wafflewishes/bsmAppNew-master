import React, { Component } from "react";
import { StyleSheet, View, ScrollView, SafeAreaView, FlatList, Text, StatusBar, Button, ActivityIndicator } from "react-native";

import Event from "./Event";
import Quote from "./Quote";



import {PastEventList, QuoteList, pastEvents, TriviaList} from './firebaseAuth';


import moment from 'moment';
import QuizRowItem from '../components/QuizRowItem'
import WeeklyButton from "./WeeklyButton";
import Loader from './Loader';



var counter = 0;
var quoteCounter = 0;
const MAXSTRINGLENGTH = 5;
var feed = [];
var key = 0;
var quoteNo = 0;
var quoteSet = {};
var index = 0;

const styles = StyleSheet.create({

  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12
  },
    header2: {
      width: 375,
      height: 95
    },
    headerTabs1: {
      width: 375,
      height: 60
    },
    feedContainer: {
      width: "100%",
      height: "100%",
 
    },
    feedContainer_contentContainerStyle: {
      width: "100%",
      flexDirection: "column"
    },
    todayContent2: {
      height: 358
    },
    upcomingSideSwipe: {
      width: "100%",
      height: 439,
      backgroundColor: "rgba(230, 230, 230,1)",
      borderColor: "rgba(124,185,231,1)",
      borderWidth: 0,
      borderTopWidth: 6,
      borderBottomWidth: 6
    },
    upcomingSideSwipe_contentContainerStyle: {
      height: 418,
      flexDirection: "column",
      justifyContent: "center"
    },
    uEventList: {
      width: "100%",
      height: 388,
      flexDirection: "row",
      marginLeft: 11,
      marginRight: 11
    },
    uEvent1: {
      width: 298,
      height: 383,
      marginRight: 11
    },
  
  });

  export class Feed extends React.Component{
    constructor(props){
        super(props);
        //this.loadFeed = this.loadFeed.bind(this);
        var tod=moment().endOf('day').fromNow();
        var now = moment();
        this.closeActivityIndicator = this.closeActivityIndicator.bind(this);
        this.state = {feed: PastEventList.filter(e => e.description != ''), loading: true};
        


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

  
  /*  loadFeed = () => {
      var RandomNumber = Math.floor(Math.random() * 5) + 1 ;
      var RandomNumber = Math.floor(Math.random() * TriviaList.length - 1) + 1 ;

      this.setState(() => {
        var feed = this.state.feed;
        if(quoteCounter < quoteSet.length){
          feed.push({type: 'Quote', status: '', quote: quoteSet[quoteCounter], seed: RandomNumber});
          quoteCounter++;
        }
        PastEventList.slice(index,index+MAXSTRINGLENGTH).forEach((item) => {
          if(feed.filter(e => e == item).length == 0){
            feed.push(item);
          }
        });
        index += MAXSTRINGLENGTH;
        return {feed: feed}

      })

    }
*/

  closeActivityIndicator = () => {setTimeout(() => this.setState({loading: false }), 6000);}

  
    render(){
        const loading = this.state.loading;
        return(
              <FlatList
                  data={this.state.feed}
                 

                  ListHeaderComponent={this.props.header}
                  renderItem={({item}) => {
                    if(item.status == "past") return <Event event={item}/>
                    else if(item.type == "Trivia") return <QuizRowItem seed = {item.seed}/>
                    else if(item.type == 'Quote') return <Quote set={item.quote} seed = {item.seed}/>
                  }}
                  onEndReachedThreshold= {2}
                  onEndReached={() => {
                    
                    pastEvents();
                    this.closeActivityIndicator();
                    

                }}

                ListFooterComponent={() => {return <View style={{height: this.state.loading ? 60 : 0, alignItems:'center', justifyContent:'center'}}><Loader animating = {loading}/></View>}}
              />
            
        );
    }
  }

  async function loadMoreItems(){
    await pastEvents();
  }

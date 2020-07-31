import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Linking, Button, FlatList, SectionList } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";
import moment from 'moment';
import ImageLoader from '../components/ImageLoader';

var overIndex = 0;

export default class MultipleEvents extends React.Component {

    constructor(props){
        super(props);
        this.loadNavigation=this.loadNavigation.bind(this);
        this.colorSelect=this.colorSelect.bind(this);
        this.loadTime=this.loadTime.bind(this);
        
    }
    state = {
        events: [
            {
                title: 'Upcoming',
                data: this.props.route.params.events.filter(e => e.status != 'past')
            },
            {
                title: 'Past Events',
                data: this.props.route.params.events.filter(e => e.status == 'past')
            },
        ],
        
        colors:[Colors.special, Colors.today, Colors.multiple, Colors.community]    
    }

    loadNavigation = (item) => {
        const navigation = this.props.navigation;
        
          if(item.status == 'ongoing')  navigation.navigate("EventPage", {event: item, color: item.color, day: this.props.route.params.day, title: 'Ongoing Event'})
          else if(item.status == 'past') navigation.navigate("EventPage", {event: item, color: item.color, day: this.props.route.params.day, title: 'Past Event'})
          else navigation.navigate("EventPage", {event: item, color: item.color, day: this.props.route.params.day, title: 'Upcoming Event'})
    }

    colorSelect = (item) => {
        
        if(item.status == 'past'){
            color = Colors.past;
        }
        else{
            color = item.color;
        }
        

        return {
            height:120,
            width: Layout.window.width,
            backgroundColor:color,
            flexDirection:'row',
        }
    }

    loadTime = (item) => {
        if(this.props.route.params.isHeader) return (<Text style={styles.time}>{moment(item.startDate, 'YYYY-MM-DD').format('MMMM Do')}</Text>);
        if(item.startTime != '') return (<Text style={styles.time}>{moment(item.startTime, 'HH:mm').format('h:mm a')}</Text>);
    }

    render() {
            return(
               <View style = {styles.container}>
                   <SectionList
                    sections = {this.state.events}
                    contentContainerStyle={{alignItems:'center', justifyContent:'center'}}
                    ItemSeparatorComponent={() => <View style ={{width: Layout.window.width, height: 1, backgroundColor: 'white', opacity: 1}} />}
                    stickySectionHeadersEnabled={false}
                    renderSectionHeader = {({section}) => {
                        if (section.data.length <= 0) return;
                        if (section.title == 'Past Events')
                            return (
                                <View style = {{backgroundColor:'white', width:Layout.window.width}}>
                                <Text style = {styles.label}>{section.title}</Text>
                            </View>
                            );
                        return;
                    }}
                    renderItem= {({item}) => (
                        <TouchableOpacity style = {this.colorSelect(item)} onPress={() => {this.loadNavigation(item)}} activeOpacity={0.6}>
                            <View style={{flex:6, justifyContent:'center', paddingHorizontal:8}}>
                                <Text style={styles.title}>{item.title}</Text>
                                {this.loadTime(item)}
                            </View>
                            <View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
                                <Text style={[styles.title, {fontSize:55, color: Colors.grey}]}>+</Text>
                            </View>


                        </TouchableOpacity>

                    )}
                   />

               </View>
    
            );
        }
}



const styles = StyleSheet.create({
   container:{
       height: '100%',
       backgroundColor:'white',
       width:'100%'
   },
   label:{
    color: Colors.header,
    alignSelf: "stretch",
    fontSize: 24,
    margin: 10,
    fontFamily: "titleFont",
    textAlign: "center",
  },
   itemRow:{
       height:120,
       width: Layout.window.width,
       borderColor:'black',
       backgroundColor: Colors.lightGold,
       flexDirection:'row',
       marginVertical:2

   },
   title:{
    color: "white",
    fontSize: 27,
    fontFamily: "titleFont",
   },
   time:{
    color: "white",
    fontSize: 22,
    fontFamily: "textFont-semiBold",
   },
   day:{
    fontSize: 20, 
    textAlign:'left', 
    color: Colors.titleColour,
    margin: 10,
    marginTop: 15,
    textAlign:'center',
    fontFamily:'textFont-semiBold'
}
  });
  
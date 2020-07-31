import React, { Component } from "react";
import { StyleSheet, Text, View, Image, ScrollView, FlatList, StatusBar, Button, SafeAreaView, Linking } from 'react-native';
import ParallaxScrollView  from 'react-native-parallax-scroll-view';

import Colors from '../constants/Colors';

import * as color from "../constants/Colors";
import { Ionicons } from '@expo/vector-icons';


import Event from '../components/Event';
import { EventList } from "../components/firebaseAuth";
import { TouchableOpacity } from "react-native-gesture-handler";


export default class Week extends React.Component {

    state = {
       event: this.props.route.params.event,
       navigation: this.props.navigation
    }

    render() {
        return(
            <SafeAreaView>

            <ScrollView style={styles.container}>
                <View style={[styles.titleBox, {height:40, alignItems:'flex-end'}]}>
                    <TouchableOpacity onPress={() => this.state.navigation.goBack()}>
                        <Ionicons
                            name='md-close'
                            size={30}
                            style={{marginHorizontal: 20, marginVertical: 8}}
                            color='white'
                            />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBox}>
                    <Image source={require('../assets/images/logo.png')}
                        resizeMode='contain'
                        style={{width: 320, height: 100, alignSelf:'center'}}
                    />
                    
                    <Text style={[styles.title, {fontSize: 30}]}>Weekly Schedule</Text>

                </View>
                <View style={styles.line}/>

                <View>
                    <Text style={styles.message}>*These events are subject to change. For sponsorship inquiries, please visit:</Text>
                    <Text onPress = {() => { Linking.openURL('https://www.bhavanishankarmandir.com/bookings')}} style={[styles.message, {textDecorationLine:'underline', fontWeight:'bold'}]}>https://www.bhavanishankarmandir.com/bookings</Text>

                    <Text style={[styles.title, styles.day]}>Monday</Text>
                    <Event event = {{title: "Shiva Puja", description: '', commonStartDate:'6:30pm - 8:00pm', thumbnail: require('../assets/images/lingam.jpg'), status:'week'}}/>
                    
                    <Text style={[styles.title, styles.day]}>Tuesday</Text>
                    <Event event = {{title: "Hanuman Puja", description: '', commonStartDate:'6:30pm - 8:00pm', thumbnail:require('../assets/images/hanuman.jpg'), status:'week'}}/>
                    
                    <Text style={[styles.title, styles.day]}>Friday</Text>
                    <Event event = {{title: "Devi Puja", description: '', commonStartDate:'6:30pm - 8:00pm', thumbnail: require('../assets/images/durga.jpg'), status:'week'}}/>
                    
                    <Text style={[styles.title, styles.day]}>Sunday</Text>
                    <Event event = {{title: "Sunday Morning Service", description: '', commonStartDate:'9:30am - 12:00pm', thumbnail: require('../assets/images/shivaparvati.jpg'), status:'week'}}/>
                    

                </View>
                <View style={{backgroundColor:Colors.lightGold, height: 360, marginTop: 10}}>
                    <Text style={[styles.title, styles.day, {color:'white', alignSelf:'center'}]}>Every Evening</Text>
                    <Event event = {{title: "Aarti", description: '', commonStartDate:'8:00pm', thumbnail: {uri:'https://static.wixstatic.com/media/28e3bd_b98b6dbd6893467a8930e473b0a7756a~mv2.png'}, status:'week'}}/>

                </View>
                
            </ScrollView>
            </SafeAreaView>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white'
    },
    titleBox:{
        height: 150,
        backgroundColor: Colors.header
    },
    message: {
        fontFamily: 'titleFont',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        lineHeight: 40,
        marginHorizontal: 8,
        color: Colors.header, alignSelf:'center', fontSize:15, lineHeight: 22 ,fontFamily:'textFont-bolditalic'
    },
    line:{
        height:3,
        width: '100%',
        flex: 2,
        marginBottom: 10,
        alignSelf: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontFamily: 'titleFont',
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        lineHeight: 40,

    },
    day:{
        fontSize: 22, 
        textAlign:'left', 
        color: Colors.titleColour,
        marginLeft: 10,
        textDecorationLine:'underline'
    }
    
  });
  
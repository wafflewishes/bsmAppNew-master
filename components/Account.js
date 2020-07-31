import React, { Component } from "react";
import {FontAwesome5} from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Linking,Image } from 'react-native';
import Layout from "../constants/Layout";
import Colors from "../constants/Colors";


function Account(props) {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => { Linking.openURL(props.account.link) }} activeOpacity={0.5}>
                <View style={[styles.text, {margin: props.account.logoMargin}]}>
                    <Image source = {props.account.logo}  resizeMode='contain' style ={{height:'100%', width:'100%'}}/>
                </View>
                <View style = {styles.icon}>
                    <FontAwesome5 name='angle-double-right' size={30} color = {Colors.grey}/>
                </View>
            </TouchableOpacity>

        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        height: 85,
        width:Layout.window.width,
        backgroundColor:'white',
        marginBottom: 7,
        shadowColor:'black',
        shadowOffset:{
            height: 3,
            width: 3
        },
        shadowOpacity: 0.1,
        borderTopRightRadius: 100,
        borderBottomRightRadius:100,
        marginRight: 20
    },
    button: {
        flexDirection: 'row',
        flex:1,


    },
    text: {
        flex: 4,
    
    },
    icon:{
       flex: 1,
       justifyContent:'center',
       alignItems:'center'
    }
})

export default Account;
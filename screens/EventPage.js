import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Linking, Button, FlatList, Animated, ActivityIndicator } from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import moment from 'moment';

import ImageLoader from '../components/ImageLoader';

import Layout from '../constants/Layout';
import Carousel from '../components/Carousel';

import color from "../constants/Colors";
import { TouchableOpacity, ScrollView } from "react-native-gesture-handler";
import LottieView from 'lottie-react-native';
import { Colors } from "react-native/Libraries/NewAppScreen";


export default class EventPage extends React.Component {

    constructor(props) {
        super(props);
        this.loadNavigation = this.loadNavigation.bind(this);
        this.isValidURL = this.isValidURL.bind(this);
        this.loadLinkButton = this.loadLinkButton.bind(this);
        this.loadTimes = this.loadTimes.bind(this);
        this.loadPictures = this.loadPictures.bind(this);

    }
    state = {
        event: this.props.route.params.event,
        color: this.props.route.params.color,
        viewable: 0,


    }

    viewableItem = 0;

    loadNavigation = link => {
        const navigation = this.props.navigation;
        navigation.setOptions({
            headerTitle: this.state.event.title
        });
        navigation.navigate("Web", { item: { link: link, title: this.state.event.title } })
    }

    isValidURL = str => {
        var pattern = new RegExp('^((https?:)?\\/\\/)?' + // protocol
            '(?:\\S+(?::\\S*)?@)?' + // authentication
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locater
        if (!pattern.test(str)) {
            return false;
        } else {

            return true;
        }
    }

    loadLinkButton = () => {
        if (this.isValidURL(this.state.event.media)) return (
            <TouchableOpacity onPress={() => this.loadNavigation(this.state.event.media)} activeOpacity={0.6} style={{ marginTop: 15 }}>
                <View style={{ height: 60, width: 200, backgroundColor: this.state.color, justifyContent: 'center', alignContent: 'center', borderRadius: 100, alignSelf: 'center' }}>
                    <Text style={{ fontSize: 20, textAlign: 'center', fontFamily: "titleFont", color: 'white' }}>See more</Text>
                </View>
            </TouchableOpacity>);
        else return;
    }



    loadTimes = () => {
        var line = '';
        if (this.state.event.startTime != '') {
            if (this.state.event.endTime != '') {
                line = moment(this.state.event.startTime, 'H:mm').format('h:mm a') + ' - ' + moment(this.state.event.endTime, 'H:mm').format('h:mm a');
            }
            else line = moment(this.state.event.startTime, 'H:mm').format('h:mm a');

            return (
                <View style={{ backgroundColor: this.state.color }}>
                    <Text style={styles.times}>{line}</Text>
                </View>);
        } else return;
    }


    onViewableItemsChanged = ({ viewableItems, changed }) => {
        console.log(viewableItems);
        var index;
        if (viewableItems[viewableItems.length - 1] != undefined)
            this.setState({ viewable: viewableItems[viewableItems.length - 1].index });
    }

    loadPictures = () => {

        if (this.state.event.multimedia.length > 1)
            return (
                <View style={{ height: '100%', width: '100%' }}>
                    <Carousel
                        data={this.state.event.multimedia}
                        onViewableItemsChanged={this.onViewableItemsChanged} // <-- use this to apply the animated view, negative margins
                        renderItem={({ item }) => (
                            <View horizontal={true}>
                                <ImageLoader
                                    source={item}
                                    resizeMode='cover'
                                    style={{ height: '100%', width: Layout.window.width }}
                                />
                            </View>
                        )}
                    />
                </View>
                // carousel
            );
        else return (

            <ImageLoader
                source={this.state.event.thumbnail}
                resizeMode='cover'
                style={{ height: '100%', width: Layout.window.width }}


            />


        )
    }

    circles = () => {
        var views;
        if (this.state.event.multimedia.length >= 2) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>
                    {this.state.event.multimedia.map((value, index) => {
                        console.log(index);
                        return <View style={[styles.circle, { backgroundColor: this.state.viewable == index ? color.lightGold : color.background, opacity: this.state.viewable == index ? 1 : 0.5 }]} />
                    })}
                </View>
            );
        }
    }

    render() {
        return (
            <ScrollView>
                <View style={{ height: 300, width: '100%' }}>

                    {this.loadPictures()}

                </View>
                <View style={{ backgroundColor: 'yellow', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', }}>

                    {this.circles()}

                </View>
                <View style={styles.container}>
                    <View style={[styles.titleBox, { backgroundColor: this.state.color }]}>
                        <View style={{ justifyContent: 'center' }}>
                            <Text style={[styles.title]}>{this.state.event.title}</Text>
                        </View>
                        <Text style={styles.date}>{this.state.event.period}</Text>
                        {this.loadTimes()}

                    </View>
                    <View style={[styles.descriptionBox, { borderColor: this.state.color, borderWidth: this.state.event.description.length == 0 ? 0 : 1 }]}>
                        <Text style={styles.description}>{this.state.event.description}</Text>
                        {this.loadLinkButton()}

                    </View>
                </View>
            </ScrollView>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        height: '100%',
        color: 'white'
    },
    circle: {
        height: 18, width: 18,
        borderRadius: 20,
        marginHorizontal: 5,
        marginTop: -40,
        shadowOffset: {
            height: 0,
            width: 0
        },
        shadowColor: color.lightGold,
        shadowOpacity: 0.7,


    },

    picture: {
        width: "100%",
        height: "100%"
    },
    title: {
        color: 'white',
        fontSize: 25,
        flexGrow: 2,
        fontFamily: "titleFont",
        alignContent: 'center',

    },
    description: {
        fontSize: 18,
        marginHorizontal: 8,
        lineHeight: 25,
        fontFamily: "textFont-regular",

    },
    descriptionBox: {
        marginVertical: 5,
        paddingVertical: 15,
        marginHorizontal: 5,
        paddingHorizontal: 5,
        borderRadius: 5

    },
    times: {
        fontFamily: 'textFont-regular',
        fontSize: 21,
        color: color.background,
        textAlign: 'left'

    },
    date: {
        fontSize: 21,
        color: 'white',
        flexShrink: 1,
        fontFamily: "textFont-semiBold",
    },
    titleBox: {
        backgroundColor: color.past,
        height: 120,
        justifyContent: 'center',

        paddingLeft: 8
    }
});

function LightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

}
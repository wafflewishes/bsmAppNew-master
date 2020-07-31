import React, { Component } from "react";
import { StyleSheet, View, SectionList, FlatList, Text, SafeAreaView, Animated } from "react-native";
import { EventList, loadMoreEvents } from "./firebaseAuth";
import moment from 'moment';
import Colors from '../constants/Colors';
import HEvent from "./HEvent";
import { render } from "react-dom";
import { LinearGradient } from 'expo-linear-gradient';
import Layout from "../constants/Layout";

import { MaterialIcons } from '@expo/vector-icons';
import Animations from "../constants/Animations";
import { color } from "react-native-reanimated";

const TODAY = moment().format();
var dates = [];
var counter = 0;

const anim_duration = 750;

const TITLE_DURATION = Animations.timing.title;

export default class SideSwiper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, dates: EventList.filter(e => e.status != 'past' && e.expandable == true).slice(0, 10) };
    this.animated = new Animated.Value(0);
    this._fade = new Animated.Value(0);
    this._size = new Animated.Value(0.5);
    this._rise = new Animated.Value(10);
    this._componant = new Animated.Value(0);
  }


  Animate = () => {
    Animated.sequence([
      Animated.delay(1000 + Animations.loadDelay),
      Animated.parallel([
        Animated.timing(this._fade, {
          toValue: 1,
          duration: TITLE_DURATION / 3
        }),
        Animated.timing(this._size, {
          toValue: 1.05,
          duration: TITLE_DURATION / 3
        }),
        Animated.timing(this._rise, {
          toValue: 0,
          duration: TITLE_DURATION / 3
        }),
      ]),
      Animated.timing(this._size, {
        toValue: 1,
        duration: TITLE_DURATION / 6,
      }),
    ]).start(() => this.AnimateComponant());
  }

  AnimateComponant = () => {
    Animated.timing(this._componant, {
      toValue: 1,
      duration: Animations.timing.componant,
    }).start();
  }


  componentDidMount() {
    this.Animate();
    Animated.loop(
      Animated.sequence([
        Animated.timing(this.animated, {
          toValue: 1,
          duration: anim_duration,
        }),
        Animated.timing(this.animated, {
          toValue: 0,
          duration: anim_duration,
        }),
      ])
    ).start();
  }



  loadFooter = () => {
    const rowStyles = [
      { alignItems: 'center' },
      {
        transform: [
          {
            translateY: this.animated.interpolate({
              inputRange: [0, 1],
              outputRange: [-3, 0],
            })
          }
        ],
      },
    ];
    return (

      <View style={styles.goToCalendar}>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
          <Text style={styles.goToCalText} numberOfLines={2}>For all events, visit the calendar</Text>
        </View>

        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }} />
          <View style={styles.gtc}>
            <Animated.View style={rowStyles}>
              <MaterialIcons
                name='arrow-drop-down'
                size={38}
                color={'white'}
              />
            </Animated.View>

          </View>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }} />
          <View style={{ flex: 1 }} />
        </View>
      </View>

    );
  }



  render() {
    const animStyle = [styles.todayText,
    { opacity: this._fade },
    {
      transform: [{
        translateY: this._rise.interpolate({
          inputRange: [0, 1],
          outputRange: [-1, 0],

        },
        )
      }, { scale: this._size }]
    }
    ];
    const DATA = [
      {
        title: 'Featured Upcoming Events',
        data: this.state.dates

      }
    ]
    return (


      <SectionList
        sections={DATA}
        style={{ backgroundColor: Colors.background }}
        onEndReachedThreshold={0.1}
        ListHeaderComponent={this.props.header}
        ListFooterComponent={this.loadFooter}
        contentContainerStyle={{ alignItems: 'center' }}
        snapToAlignment='center'
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item.key}
        renderSectionHeader={({ section: { title } }) => (
          <View style={{ backgroundColor: Colors.background, width: Layout.window.width }}>
            <Animated.Text style={animStyle}>{title}</Animated.Text>
          </View>
        )}

        renderItem={({ item }) => {
          return(
          <Animated.View style={{opacity:this._componant}}>
            <HEvent
              event={item}
              style={styles.uEvent1}
            />
          </Animated.View>);

        }}
      />

    );
  }
}

const styles = StyleSheet.create({

  upcomingSideSwipe: {
    height: Layout.window.height - 120,
    backgroundColor: Colors.background,
    borderColor: "rgba(124,185,231,1)",

  },
  gtc: {
    flex: 1, alignItems: 'center', justifyContent: 'flex-start'
  },
  upcomingSideSwipe_contentContainerStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  uEventList: {
    width: "100%",
    flex: 10,
    flexDirection: "row",
  },
  uEvent1: {
    marginBottom: 20,
  },
  todayText: {
    color: Colors.titleColour,
    alignSelf: "stretch",
    fontSize: 24,
    margin: 20,
    fontFamily: "titleFont",
    textAlign: "center",
  },
  goToCalendar: {
    height: 60,
    width: Layout.window.width,
    backgroundColor: Colors.lightGold,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6
  },
  goToCalText: {
    flex: 3,
    color: 'white',
    fontFamily: 'titleFont',
    fontSize: 21,
    //backgroundColor: 'red',
    textAlign: 'center'

  },
});
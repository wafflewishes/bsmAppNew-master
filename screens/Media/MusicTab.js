import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";


import Event from '../../components/Event';
import Account from '../../components/Account';

import Carousel from '../../components/Carousel';

import { getMusic } from '../../components/firebaseAuth';
import Layout from "../../constants/Layout";
import Styles from "../../constants/Styles";




var saved = '';
export default class MusicTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { latest: '' }
  }

  state = { latest: '' }


  componentDidMount() {
    if (saved != '') this.setState({ latest: saved });
    else this.loadVideo();
  }
  loadVideo = async () => {
    var latest = await getMusic('Spotify');
    latest.thumbnail = "https://mosaic.scdn.co/640/ab67616d0000b27319279c9bb49db903151ccecdab67616d0000b27372b305ad012976bfaaca8deaab67616d0000b2739fbc39d9dc41dd202576b3b9ab67616d0000b273bb1b1c961e8179965f78a0bc";
    this.setState({ latest: latest })
    saved = latest;


  }
  render() {
    
  const DATA = [
    {
      title: this.state.latest.title, commonStartDate: this.state.latest.date, thumbnail: { uri: this.state.latest.thumbnail }, status: 'media', link: "https://open.spotify.com/playlist/0Y21EkelL49QXbySWQAjIH?si=D68MjMCMQaC--JLADxdDng"
    },
    {
      title: this.state.latest.title, commonStartDate: this.state.latest.date, thumbnail: { uri: this.state.latest.thumbnail }, status: 'media', link: "https://open.spotify.com/playlist/0Y21EkelL49QXbySWQAjIH?si=D68MjMCMQaC--JLADxdDng"
    },
    {
      title: this.state.latest.title, commonStartDate: this.state.latest.date, thumbnail: { uri: this.state.latest.thumbnail }, status: 'media', link: "https://open.spotify.com/playlist/0Y21EkelL49QXbySWQAjIH?si=D68MjMCMQaC--JLADxdDng"
    },
    {
      title: this.state.latest.title, commonStartDate: this.state.latest.date, thumbnail: { uri: this.state.latest.thumbnail }, status: 'media', link: "https://open.spotify.com/playlist/0Y21EkelL49QXbySWQAjIH?si=D68MjMCMQaC--JLADxdDng"
    },
  ]
    return (
      <View style={styles.container}>

        <Carousel
          data={DATA}
          renderItem={({ item }) => (
              <Event event = {item} style = {{padding: 10}} borderRadius = {20}/>
          )}
        />
        <View style={Styles.Media.descBox}>
          <Text style={Styles.Media.text}>Specially currated playlist of peaceful bhajans, kirtans and dhoons</Text>
          <Text style={Styles.Media.visit}>Listen on:</Text>

        </View>
        <View style={Styles.Media.accountBox}>
          <Account account={{ title: 'Spotify', link: 'https://open.spotify.com/playlist/0Y21EkelL49QXbySWQAjIH?si=D68MjMCMQaC--JLADxdDng', logo: require('../../assets/platforms/Spotify/Spotify_Logo_RGB_Green.png'), logoMargin: 17 }} />
        </View>
      </View>
    )
  }
}

//        <Event event={{ title: this.state.latest.title, commonStartDate: this.state.latest.date, thumbnail: { uri: this.state.latest.thumbnail }, status: 'media', link: "https://open.spotify.com/playlist/0Y21EkelL49QXbySWQAjIH?si=D68MjMCMQaC--JLADxdDng" }} />

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-evenly',
  },
})





import React, { Component, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";


import Event from '../../components/Event';
import Account from '../../components/Account';


import { getVideo } from '../../components/firebaseAuth';
import Styles from '../../constants/Styles';

var saved = '';
export default class VideosTab extends React.Component {

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
    var latest = await getVideo('Youtube');
    this.setState({ latest: latest })
    saved = latest;


  }
  render() {
    return (
      <View style={styles.container}>
        <Event event={{ title: this.state.latest.title, commonStartDate: this.state.latest.date, thumbnail: { uri: this.state.latest.thumbnail }, status: 'media', link: this.state.latest.link }} />
        <View style={Styles.Media.descBox}>
          <Text style={Styles.Media.text}>A collection of videos created for the community by Pt. Hardat Ashwar and other members of the Mandir.</Text>
          <Text style={Styles.Media.visit}>Watch on:</Text>

        </View>
        <View style={Styles.Media.accountBox}>
          <Account account={{ title: 'Youtube', link: 'https://www.youtube.com/playlist?list=PLqy4GnZbJQ51lHal1XmnO1Cj3ZE--hV4x', logo: require('../../assets/platforms/youtube/yt_logo_rgb_light.png'), logoMargin: 27 }} />
          <Account account={{ title: 'Facebook', link: 'https://www.facebook.com/Bhavani-Shankar-Mandir-178234648891478/videos/?ref=page_internal', logo: require('../../assets/platforms/facebook/FindUsOn_Header_2019.png'), logoMargin: 27 }} />
        
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex:1,
    justifyContent:'space-evenly'
  },
})





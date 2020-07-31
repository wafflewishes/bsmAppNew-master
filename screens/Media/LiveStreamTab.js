import React, { Component } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";


import { getLivestream } from '../../components/firebaseAuth';


import Event from '../../components/Event';
import Account from '../../components/Account';

import Styles from '../../constants/Styles';


// title, commonStartDate, thumbnail
var saved = '';

export default class LiveStreamTab extends React.Component {
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
        var latest = await getLivestream('Youtube');
        this.setState({ latest: latest })
        saved = latest;


    }
    render() {
        return (
            <View style={styles.container}>
                <Event event={{ title: this.state.latest.title, commonStartDate: this.state.latest.date, thumbnail: { uri: this.state.latest.thumbnail }, status: 'media', link: this.state.latest.link }} />
                <View style={Styles.Media.descBox}>
                    <Text style={Styles.Media.text}>A collection of past Livestreams hosted by the Mandir.</Text>
                    <Text style={Styles.Media.visit}>Watch on:</Text>

                </View>
                <View style={Styles.Media.accountBox}>

                    <Account account={{ title: 'Youtube', link: 'https://www.youtube.com/c/HARDATASHWAR/videos', logo: require('../../assets/platforms/youtube/yt_logo_rgb_light.png'), logoMargin: 27 }} />
                    <Account account={{ title: 'Facebook', link: 'https://www.facebook.com/Bhavani-Shankar-Mandir-178234648891478/', logo: require('../../assets/platforms/facebook/FindUsOn_Header_2019.png'), logoMargin: 27 }} />
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

    }
})
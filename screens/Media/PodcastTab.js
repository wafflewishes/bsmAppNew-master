import React, { Component } from "react";
import { StyleSheet, ScrollView, Text, View } from "react-native";


import Event from '../../components/Event';
import Account from '../../components/Account';

import { getPodcast } from '../../components/firebaseAuth';
import Styles from '../../constants/Styles';

// title, commonStartDate, thumbnail
var saved = '';
export default class PodcastTab extends React.Component {
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
        var latest = await getPodcast('Spotify');
        this.setState({ latest: latest })
        saved = latest;


    }
    render() {
        return (
            <View style={styles.container}>
                <Event event={{ title: this.state.latest.title, commonStartDate: this.state.latest.date, thumbnail: { uri: this.state.latest.thumbnail }, status: 'media', link: this.state.latest.link }} />
                <View style={Styles.Media.descBox}>
                    <Text style={Styles.Media.text}>Life, philosophy, and religion explained in a practical and simple way.</Text>
                    <Text style={Styles.Media.visit}>Listen on:</Text>

                </View>
                <View style={Styles.Media.accountBox}>
                    <Account account={{ title: 'Spotify', link: 'https://open.spotify.com/show/4AOIOV3FO1w7PkXwduA0kg', logo: require('../../assets/platforms/Spotify/Spotify_Logo_RGB_Green.png'), logoMargin: 17 }} />
                    <Account account={{ title: 'Youtube', link: 'https://www.youtube.com/playlist?list=PLqy4GnZbJQ53JD4PD6OL51H9T6ixOtLGc', logo: require('../../assets/platforms/youtube/yt_logo_rgb_light.png'), logoMargin: 25 }} />

                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-evenly'

    }
})
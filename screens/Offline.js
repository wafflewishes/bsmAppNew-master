import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../constants/Colors';
import { EventList, loadMoreEvents, getQuotes, getTrivia, pastEvents } from '../components/firebaseAuth';

export default class Offline extends React.Component {
    state = { events: EventList }


    render() {
        return (
            <View style={styles.container}>
                <Image source={require('../assets/images/whitePlain.png')} style={styles.image} resizeMode='contain' />
                <Text numberOfLines={4} style={styles.text}>You appear to be Offline. Please check your network connection and relaunch the app. {'\n'}[error code: 0x001]</Text>

            </View>
        )
    }
}
/**
 *                <TouchableOpacity onPress={() => { if (this.state.events.length > 2) this.props.navigation.navigate("Root", {}) }} style={styles.retryButtonContainer}>
                    <View style={styles.retryBackground}>
                        <Text style={[styles.text, { color: 'white', opacity: 1 }]}>Retry</Text>
                    </View>
                </TouchableOpacity>
 * 
 */

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 50,
        paddingVertical: 100
    },
    text: {
        textAlign: 'center',
        fontFamily: 'textFont-semiBold',
        opacity: 0.7,
        fontSize: 18
    },
    image: {
        height: 100,
        width: 100,
        tintColor: Colors.header,
        margin: 20
    },
    retryButtonContainer: {
        height: 50,
        width: 200,
    },
    retryBackground: {
        backgroundColor: Colors.header,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flex: 1,

    }
})
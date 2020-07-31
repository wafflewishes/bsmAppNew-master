import React from 'react';
import { View , FlatList , StyleSheet} from 'react-native';
import {  } from 'react-native-gesture-handler';
import { PastEventList, pastEvents } from '../components/firebaseAuth';
import Regular from '../components/Regular';
import Layout from '../constants/Layout';
import Colors from '../constants/Colors';


export default class PastEventsFeed extends React.Component{
    constructor(props){
        super(props);
        this.state = {events: PastEventList.filter(e => e.description.length > 0)};

    }
    render(){
        return(
            <View>
                <FlatList
                    data = {this.state.events}
                    contentContainerStyle={styles.container}
                    renderItem = {({item}) => {
                        return(
                            <Regular 
                            event = {item}
                            style = {styles.today2}
                            color = {Colors.lightGrey}
                            title = 'Past Event'
                            />
                        );
                    }}
                    onEndReachedThreshold = {2}
                    onEndReached = {() => {pastEvents()}}
                />
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
    },
    today2: {
        width: Layout.window.width*0.95,
        height: 110,
        shadowOffset: {
          height: 5,
          width: 5
        },
        shadowColor: Colors.lightBlue,
        shadowOpacity: 0.4,
        marginTop: 16,
        
      },

})
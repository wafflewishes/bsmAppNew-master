import React from 'react';
import { FlatList } from 'react-native';
import Layout from '../constants/Layout';

export default class Carousel extends React.Component {
    
    viewabilityConfig = {
        itemVisiblePercentThreshold: 75
    }
    render() {
        return (
            <FlatList
                indicatorStyle = 'black'
                snapToAlignment='center'
                snapToInterval={Layout.window.width}
                keyExtractor={(item, index) => { return item + index }}
                decelerationRate={0}
                style={{ flex: 1 }}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={true}
                viewabilityConfig={this.viewabilityConfig}
                horizontal={true}
                {...this.props}


            />

        );
    }
}
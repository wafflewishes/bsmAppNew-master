import React, { Component } from "react";
import {Animated, ActivityIndicator } from 'react-native';
import {Loader} from './Loader';

export default class ImageLoader extends Component{
    state = {
        opacity: new Animated.Value(0),
    }

    onLoad = () => {
        Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start();
    }

    render() {
        return (
            <Animated.Image
                onLoadEnd = {this.onLoad}
                loadingIndicatorSource = {require('../assets/images/lingamFull.gif')}

                {...this.props}
                style={[
                    {
                        opacity: this.state.opacity
                    },
                    this.props.style,
                ]}
            >
            </Animated.Image>
        )
    }
}

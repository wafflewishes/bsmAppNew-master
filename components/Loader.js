import LottieView from 'lottie-react-native';
import React, { Component } from "react";


export default function Loader(props){
    return(
        <LottieView
          
            source={require('../assets/images/loadingFull.json')}
            style={{
              width: 50,
              height: 50,
              opacity: props.animating ? 1 : 0,
            }}
            autoPlay
            loop

            
  />
    );
}
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

// ...
export default class Web extends Component {
    state = {
        link: this.props.route.params.item.link,
     }
  render() {
    return <WebView source={{ uri: this.state.link }} />;
  }
}
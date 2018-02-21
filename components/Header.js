import React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import Layout from '../constants/Layout'
import {
  Text,
  Container,
  Content,
  Header,
} from "native-base";

export class ItemHeader extends React.Component {

  render() {
    return (
      <View>
        <View>
          <Image source={{uri: this.props.banner}} resizeMode="cover" style={{height: Layout.window.height/3, width: Layout.window.width}}/ >
        </View>
        <Text style={{position: 'absolute', color: '#fff'}}>{this.props.title}</Text>
      </View>
    )
  }
}

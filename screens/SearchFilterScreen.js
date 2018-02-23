import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ButtonGroup } from 'react-native-elements';
import { Button } from 'native-base'
import { Picker, List, WingBlank } from 'antd-mobile';

import { Filters } from '../components/Filters'

export default class FilterScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Filters',
      headerLeft: null,
      headerRight: <Ionicons name='ios-close' size={24} onPress={() => navigation.goBack()}/>
    };

  };

  constructor(props) {
    super(props)
    this.state  = {}
  }

  prefetch

  render() {
    var indexes = this.state

    return (
      <ScrollView style={styles.container}>
          <Filters/>


      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#f5f5f9',
  },
});

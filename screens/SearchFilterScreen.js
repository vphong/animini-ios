import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ButtonGroup } from 'react-native-elements';
import { Button } from 'native-base'
import { Picker, List, WhiteSpace } from 'antd-mobile';

import Filters from '../components/Filters'

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


  render() {
    var indexes = this.state

    return (
      <ScrollView style={styles.container}>

      <Filters/>
      
      <Text>Type</Text>
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={indexes.seasonIndex}
        buttons={['Spring', 'Summer', 'Fall', 'Winter']}
        component={Button}
      />

      <Text>Genres</Text>
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={indexes.seasonIndex}
        buttons={['Spring', 'Summer', 'Fall', 'Winter']}
        component={Button}
      />

      <Text>Tags</Text>
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={indexes.seasonIndex}
        buttons={['Spring', 'Summer', 'Fall', 'Winter']}
        component={Button}
      />

      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ButtonGroup } from 'react-native-elements';
import { Button } from 'native-base'
import { Picker, List, WhiteSpace } from 'antd-mobile';

import MediaStatusPicker from '../components/MediaStatusPicker'

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


    this.state = {
      sort:  0,
      season: 0,
      seasonVal: [_determineSeason(), THIS_YEAR.toString()]
    }

  }


  render() {
    console.log(SORT_OPTIONS)
    var indexes = this.state

    return (
      <ScrollView style={styles.container}>

      <Picker data={SORT_OPTIONS} cols={1}>
        <List.Item arrow="horizontal">Sort by</List.Item>
      </Picker>

      <WhiteSpace/>
      <Picker data={SEASONS_YEARS} value={this.state.seasonVal} cascade={false}>
        <List.Item arrow="horizontal">Season</List.Item>
      </Picker>

      <MediaStatusPicker value={["RELEASING"]}/>

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

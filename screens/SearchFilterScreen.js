import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ButtonGroup } from 'react-native-elements';
import { Button } from 'native-base'
import { Picker, List, WhiteSpace } from 'antd-mobile';

const SORT_OPTIONS = [
    { label: 'Popularity',  value: 'POPULARITY', children: [] },
    { label: 'Score', value: 'SCORE', children: [] },
    { label: 'Date Added', value: 'UPDATED_AT', children: [] },
    { label: 'Start Date', value: 'START_DATE', children: [] },
    { label: 'End Date', value: 'END_DATE', }
]

const THIS_YEAR = new Date().getFullYear();
const YEARS = function() {
  let years = []
  var yearStart = 1924, yearEnd = THIS_YEAR;
  while (yearEnd >= yearStart ) {
    years.push({label: yearEnd.toString(), value: yearEnd.toString()});
    yearEnd--;
  }
  return years
}
const SEASONS_YEARS = [[
    { label: 'Spring', value: 'SPRING' },
    { label: 'Summer', value: 'SUMMER' },
    { label: 'Fall', value: 'FALL' },
    { label: 'Winter', value: 'WINTER' },
  ], YEARS()
]

var _determineSeason = () => {
    let thisMonth = new Date().getMonth(), season;

    if (thisMonth == 11 || thisMonth <= 1) {
      season = "WINTER";
    }
    else if (thisMonth >= 2 && thisMonth <= 4) {
      season = "SPRING";
    }
    else if (thisMonth >= 5 && thisMonth <= 7) {
      season = "SUMMER";
    }
    else {
      season = "FALL";
    }

    return season
  }


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
    console.log(this.state)
    let indexes = this.state

    return (
      <ScrollView style={styles.container}>

      <Picker data={SORT_OPTIONS} cols={1} className="forss">
        <List.Item arrow="horizontal">Sort by</List.Item>
      </Picker>

      <WhiteSpace/>
      <Picker data={SEASONS_YEARS} value={this.state.seasonVal} cascade={false}>
        <List.Item arrow="horizontal">Season</List.Item>
      </Picker>


      <Picker data={SEASONS_YEARS} value={this.state.seasonVal} cascade={false}>
        <List.Item arrow="horizontal">Status</List.Item>
      </Picker>

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

import React from 'react';
import { ScrollView, StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Content, Footer, Text, Icon, Left, Body } from 'native-base';
import { Picker, WingBlank, List, Radio, Flex, SegmentedControl, DatePicker } from 'antd-mobile';
import { request, GraphQLClient } from 'graphql-request';
import { Anilist } from 'animini/constants/Config';

import { Media, labelFormat } from 'animini/constants/Config';
import { IndeterminateCheckboxes } from 'animini/components/IndeterminateCheckboxes'

const client = new GraphQLClient(Anilist.api, {
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
  },
})
export class Filters extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      statuses: [],
      genres: [],
      chosen: {
        status: "RELEASING",
        season: Media.currSeason,
        seasonYear: Media.currYear,
        sort: "POPULARITY_DESC"
      },
      sortOptions: Media.sortOptions
    }

    this._getTypeEnums = this._getTypeEnums.bind(this);
    this._onGenreChange = this._onGenreChange.bind(this);
  }

  async componentDidMount() {
    this.setState({ loading: true })

    await client.request(FILTERS_QUERY).then(data => {
      this.setState({
        ...this.state,
        genres: this._getTypeEnums(data.GenreCollection),
        statuses: this._getTypeEnums(data.__type.enumValues),
        tags: data.MediaTagCollection,
        loading: false
      });
    }).catch(error => {

        console.log(error)
    })

  }

  _onGenreChange = (val) => {
    this.setState({
      ...this.state,
      chosen: {
        ...this.state.chosen,
        genres: {
          ...this.state.chosen.genres,
          ...val
        }
      }
    })
  }


  _getTypeEnums(enums) {

    let formattedEnums = [];

    if (enums instanceof Array){
    for (var i = 0; i < enums.length; i++) {
      let val = enums[i].name ? enums[i].name : enums[i];

      formattedEnums.push({
        value: val.toUpperCase(),
        label: labelFormat(val)
      })
    }}
    return formattedEnums;
  }

  componentWillUpdate(newProps, newState) {
    // send to parent BrowseScreen
    if (this.state != newState)
      this.props.onFilterChange(this.state.chosen)
  }



  render () {
    let sort = _.map(Media.sortOptions, 'label')
    return (
      <View>

        <List renderHeader={() => 'Sort by'}/>
        <SegmentedControl values={Media.sortOptions.map(item => (item.label))}
          onChange={e => this.setState({
            ...this.state,
            chosen: {
              ...this.state.chosen,
              sort: e.nativeEvent.value.toUpperCase()
            }
          })}/>

        <List renderHeader={() => 'Filter by'}>

        <SegmentedControl values={Media.seasons.map(item => (item.label))}
          onChange={e => {let val = e.nativeEvent.value.toUpperCase(); this.setState({
            ...this.state,
            chosen: {
              ...this.state.chosen,
              season: val
            }
          });}}/>

        <Picker data={Media.years} cols={1} extra={this.state.chosen.seasonYear}
          value={this.state.chosen.seasonYear}
          onChange={(v) => this.setState({
            ...this.state,
            chosen: {
              ...this.state.chosen,
              seasonYear: v
            }
          })}>
          <List.Item arrow="horizontal">Year</List.Item>
        </Picker>


        <Picker data={this.state.statuses} cols={1}
          value={this.state.chosen.status}
          onChange={(v) => this.setState({
            ...this.state,
            chosen: {
              ...this.state.chosen,
              status: v
            }
          })}>

          <List.Item arrow="horizontal">Airing Status</List.Item>

        </Picker>
      </List>

      <List renderHeader={() => 'Genres'}/>
      <IndeterminateCheckboxes data={this.state.genres} onGenreChange={this._onGenreChange}/>

    </View>
  )}

}

const FILTERS_QUERY = `
query {
    __type(name: "MediaStatus") {
       enumValues {
           name
       }
    }
    GenreCollection
    MediaTagCollection {
      id
      name
      category
      isAdult
      description
    }
}
`

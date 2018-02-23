import React from 'react';
import gql from 'graphql-tag';
import { ScrollView, StyleSheet, View, ActivityIndicator, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Container, Content, Footer, Text, Icon, Left, Body } from 'native-base';
import { Picker, WingBlank, List, Radio, Flex } from 'antd-mobile';

import { Media } from '../constants/Config';
import { IndeterminateCheckboxes } from '../components/IndeterminateCheckboxes'

var labelFormat = (str) => {
  var formatted = str.replace(/[_]/g, " ")

  return formatted.replace(/\B\w/g, function(c) { return c.toLowerCase() })
}

export class Filters extends React.Component {

  constructor(props) {
    super(props);

    // this.props.client.writeQuery({
    //   GENRE_QUERY,
    //   data: 'GenreCollection'
    // })

    this.state = {
      statuses: [],
      genres: [],
      chosen: {
        status: "AIRING",
        season: [Media.currSeason, Media.currYear],
        sort: "POPULARITY"
      },
      sortOptions: Media.sortOptions
    }


    this._getTypeEnums = this._getTypeEnums.bind(this);
    // this._generateGenreBadges = this._generateGenreBadges.bind(this);
    // this._onPressListItem = this._onPressListItem.bind(this);
  }

  _getTypeEnums(enums) {

    let formattedEnums = [];

    if (enums instanceof Array){
    for (var i = 0; i < enums.length; i++) {
      let val = enums[i].name ? enums[i].name : enums[i];

      formattedEnums.push({
        value: val,
        label: labelFormat(val)
      })
    }}
      // console.log(formattedEnums)
      return formattedEnums;
  }

  componentWillReceiveProps(newProps) {

    if (this.props.status_q !== newProps.status_q) {

      let enums = newProps.status_q.__type.enumValues;

      this.setState({ statuses: this._getTypeEnums(enums) })
    }
    if (this.props.genre_q !== newProps.genre_q) {

      let formattedGenres = this._getTypeEnums(newProps.genre_q.GenreCollection);
      // console.log(newProps.genre_q.GenreCollection)
      this.setState({ genres: formattedGenres })
    }


  }


  _renderSelectedIcon(selected) {
    return selected ? <Ionicon name="ios-checkmark" color="green"/> : null
  }


  render () {
    var displaySeason = `${labelFormat(this.state.chosen.season[0])} ${this.state.chosen.season[1]}`;
    return (
      <View>

        <List renderHeader={() => 'Sort by'}>
          {
            Media.sortOptions.map((item, i) => (
              <Radio.RadioItem key={i}
                checked={this.state.chosen.sort === item.value}
                onChange={() => (this.setState({
                  chosen: {
                    ...this.state.chosen,
                    sort: item.value
                  }
                }))}>
                {item.label}
              </Radio.RadioItem>
            ))
          }
        </List>

        <List renderHeader={() => 'Filter by'}>
          <Picker data={[Media.seasons, Media.years]} cascade={false}
            value={this.state.chosen.season}
            onChange={(v) => this.setState({
              chosen: {
                ...this.state.chosen,
                season: v
              }
            })}>
            <List.Item arrow="horizontal"
              extra="what"> Season</List.Item>
          </Picker>


          <Picker data={this.state.statuses} cols={1}
            value={this.state.chosen.status}
            onChange={(v) => this.setState({
              chosen: {
                ...this.state.chosen,
                status: v
              }
            })}>

            <List.Item arrow="horizontal">Airing Status</List.Item>

          </Picker>
        </List>

        <WingBlank>
          <IndeterminateCheckboxes data={this.state.genres}/>
        </WingBlank>

      </View>
  )}

}

const MEDIA_STATUS_QUERY = gql`
query {
    __type(name: "MediaStatus") {
       enumValues {
           name
       }
    }
}
`

const GENRE_QUERY = gql`
query {
    GenreCollection
}
`

const MEDIA_TAG_QUERY = gql`
query {
  MediaTagCollection {
    id
    name
    category
    isAdult
    description
  }
}
`

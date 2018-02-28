import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Animated
 } from 'react-native';
import { request, GraphQLClient } from 'graphql-request';
import { Anilist } from 'animini/constants/Config';
import { Ionicons } from '@expo/vector-icons';
import Layout from 'animini/constants/Layout';

import { WingBlank, List } from 'antd-mobile';
import { MediaListItem } from 'animini/components/MediaListItem';

import * as _ from 'lodash';

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when ready
const IMAGE_WIDTH = 230, IMAGE_HEIGHT = 324/1.5;
const NUM_COLUMNS = 1;

const client = new GraphQLClient(Anilist.api, {
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
  },
})

const PER_PAGE = 2;

export class MediaList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {
        Page: {
          pageInfo: {
            currentPage: 1,
            perPage: PER_PAGE
          },
          media: []
        }
      },
    }
    this._renderItem = this._renderItem.bind(this)
    this._renderFooter = this._renderFooter.bind(this)
    this._onEndReached = this._onEndReached.bind(this)
  }

  async componentWillReceiveProps(newProps) {

    // check for new filter values
    if (!_.isEqual(newProps.queryVars, this.props.queryVars)) {

      // async loading state
      this.setState({ loading: true });

      await client.request(ANIME_QUERY, {
        page: 1, // new filters, first page
        perPage: PER_PAGE,
        ...newProps.queryVars
      }).then(data => {

        this.setState({
          ...this.state,
          data: data,
          loading: false
        });

      })

      console.log(newProps.queryVars)

    }
  }

  _renderItem = ({ item }) => {
    if (this.state.loading) {
        return <ActivityIndicator/>
    }
    else {
      return <MediaListItem item={item} navigation={this.props.navigation}/>
    }
  };

  _onEndReached() {

    let queryVars = {
      ...this.props.queryVars,
      page: this.state.data.Page.pageInfo.currentPage+1,
      perPage: PER_PAGE
    };

    // console.log(queryVars)

    client.request(ANIME_QUERY, queryVars).then(newData => {

      // console.log(newData.Page.pageInfo)
      // use lodash to deep compare media objects and filter duplicates
      let newMedia = _.uniqBy([
          ...this.state.data.Page.media,
          ...newData.Page.media
      ], 'id')

      this.setState({
        ...this.state,
        data: {
          "Page": {
            "pageInfo": newData.Page.pageInfo,
            "media": newMedia
          }
        }
      });



    }).catch(error => {
      console.log(error)
    })
  }

  _renderFooter = () => {
    if (this.state.data.Page.pageInfo.total) {
      return <View><ActivityIndicator size="large"/></View>
    }
    else {
      return <View><Text>No results.</Text></View>
    }
  }

  render() {
    return (
        <FlatList
          data={this.state.data.Page.media}
          numColumns={NUM_COLUMNS}
          // onRefresh={() => data.refetch()}
          keyExtractor={(item, index) => item.id}
          renderItem={this._renderItem}
          onEndThreshold={0}
          onEndReached={this._onEndReached}
          ListFooterComponent={this._renderFooter()}
        />
  )
  }

}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component


const ANIME_QUERY = `
  query ($page: Int, $perPage: Int, $media: MediaType, $sort: [MediaSort],
    $status: MediaStatus, $season: MediaSeason, $seasonYear: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        hasNextPage
        perPage
      }
      media (type: $media, sort: $sort, status: $status, season: $season, seasonYear: $seasonYear) {
        id
        title {
          userPreferred
        }
        studios(isMain: true) {
          nodes {
            name
          }
        }
        coverImage {
          medium
        }
        averageScore
        popularity
        isAdult
        season
        startDate {
          year
        }
        genres
        tags {
          name
        }
        format
        episodes
      }
    }
  }
`

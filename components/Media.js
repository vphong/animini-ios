import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity
 } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { MonoText } from './StyledText'

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when ready

var IMAGE_SCALE = 1.85
var NUM_COLUMNS = 3


function MediaList({ data, navigation }) {

  if (data.networkStatus === 1) {
    return <ActivityIndicator />;
  }

  if (data.error) {
    return <Text>Error: {data.error.message}</Text>;
  }

  return (

    <FlatList
      data={(data.Page) && data.Page.media}
      onEndReachedThreshold={1}
      horizontal={false}
      numColumns={NUM_COLUMNS}
      refreshing={data.networkStatus === 4}
      onRefresh={() => data.refetch()}
      keyExtractor={(item, id) => item.id}
      renderItem={ ({ item }) => (
        <TouchableOpacity onPress={() => navigation.push('Details', {'item': item})}>
           <Image source={{uri: item.coverImage.large}} style={{width: 230/IMAGE_SCALE, height: 326/IMAGE_SCALE}}/>
        </TouchableOpacity>
      )}
      onEndReached={() => {
        var nextPage =
        data.fetchMore({
          variables: { page: data.Page.pageInfo.currentPage + 1 },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            // Don't do anything if there weren't any new items
            if (!fetchMoreResult ||
                (previousResult.Page.pageInfo.currentPage == fetchMoreResult.Page.pageInfo.currentPage)
                || !previousResult.Page.pageInfo.hasNextPage) {
              return previousResult;
            }

            // build pageInfo separately to avoid nested obj shenanigans
            var newPageInfo = Object.assign({}, previousResult.Page.pageInfo, fetchMoreResult.Page.pageInfo)

            return Object.assign({}, previousResult, {
              "Page": {
                "__typename": previousResult.Page.__typename,
                "pageInfo": newPageInfo,
                "media": [
                  ...previousResult.Page.media,
                  ...fetchMoreResult.Page.media
                ]}
            });

          },
        });
      }}
    />
  );

}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component
const PAGE_SIZE = 6;
var currPage = 1;
const ANIME_QUERY = gql`
  query ($page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        hasNextPage
        perPage
      }
      media (type: ANIME, season: WINTER, seasonYear: 2018, format: TV) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
      }
    }
  }
`
export default graphql(ANIME_QUERY, {
  options: {
    notifyOnNetworkStatusChange: true,
  },
  props: ({ ownProps, data }) => ({
    'data': data,
    'navigation': ownProps.navigation
  })
})(MediaList);

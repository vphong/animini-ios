import React from 'react';
import { Text, View, StyleSheet, FlatList, ListItem, ActivityIndicator, Image } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { MonoText } from './StyledText'

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when ready

var _renderItem = function({item}) {
   return (
     <View>
      <Image source={{uri: item.coverImage.large}} style={{width: 230, height: 326}}/>
     </View>
     // <Text> {item.title.romaji} </Text>
   )
}

function MediaList({ data }) {

  if (data.networkStatus === 1) {
    return <ActivityIndicator />;
  }

  if (data.error) {
    return <Text>Error: {data.error.message}</Text>;
  }

  return (
    <FlatList
      data={(data.Page) && data.Page.media}
      refreshing={data.networkStatus === 4}
      onRefresh={() => data.refetch()}
      keyExtractor={(item, id) => item.id}
      renderItem={_renderItem}
      onEndReached={() => {
        data.fetchMore({
          variables: { page: data.Page.pageInfo.currentPage + 1 },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            // Don't do anything if there weren't any new items

            if (!fetchMoreResult || fetchMoreResult.Page.pageInfo.perPage === 0) {
              return previousResult;
            }

            console.log(fetchMoreResult.Page.pageInfo.currentPage)
            console.log(fetchMoreResult.Page.media[0])

            const newPageData = {
              "pageInfo": fetchMoreResult.Page.pageInfo ,
              "media": [
                ...previousResult.Page.media,
                ...fetchMoreResult.Page.media
              ]
            }

            // console.log(newPageData)

            // console.log(previousResult)
            return newPageData;
          },
        });
      }}
    />
  );

}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component
const PAGE_SIZE = 2;
var currPage = 1;
const ANIME_QUERY = gql`
  query ($page: Int, $perPage: Int) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media (type: ANIME, season: WINTER, seasonYear: 2017, format: TV) {
        id
        title {
          romaji
        }
        coverImage {
          large
          medium
        }
        bannerImage
      }
    }
  }
`
export default graphql(ANIME_QUERY, {
  options: {
    notifyOnNetworkStatusChange: true,
    variables: { page: currPage, perPage: PAGE_SIZE },
  },
})(MediaList);

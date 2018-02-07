import React from 'react';
import { Text, View, StyleSheet, FlatList, ListItem, TouchableOpacity, Image } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { MonoText } from './StyledText'

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when ready

var _renderItem = function({item}) {
   console.log(item)
   return (
     <View>
      <Image source={{uri: item.coverImage.large}} style={{width: 230, height: 326}}/>
     </View>
     // <Text> {item.title.romaji} </Text>
   )
}

function MediaList({ data }) {

  return (
    <FlatList
      data={(data.Page) && data.Page.media}
      refreshing={data.networkStatus === 4}
      onRefresh={() => data.refetch()}
      keyExtractor={(item, id) => item.id}
      renderItem={_renderItem}
    />
  );

}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component
const ANIME_QUERY = gql`
  query MediaPage {
    Page (page: 1, perPage: 3) {
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
})(MediaList);


const styles = StyleSheet.create({
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
});

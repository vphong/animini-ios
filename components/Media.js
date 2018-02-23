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
import gql from 'graphql-tag';
import Layout from '../constants/Layout';

import { Card, CardItem, Left, Body, Right, Button, Icon } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
// import { Card } from 'react-native-elements';

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when ready
const IMAGE_WIDTH = 230, IMAGE_HEIGHT = 324/1.5;
const NUM_COLUMNS = 2;
var dyWidth = Math.floor(Layout.window.width/NUM_COLUMNS);


export class MediaList extends React.Component {

  _renderItem = ({ item }) => {
    return(
      <Card>
        <TouchableOpacity onPress={() => navigation.push('Details', {'item': item})}>
          <CardItem cardBody>
            <Image source={{uri: item.coverImage.large}} style={{height: 200, width: null, flex: 1}}/>
          </CardItem>
          <CardItem>
            <Body>
                <Text>{item.title.romaji}</Text>
            </Body>
          </CardItem>
        </TouchableOpacity>
      </Card>
    )
  }
  //
  // if (data.networkStatus === 1) {
  //   return <ActivityIndicator />;
  // }
  //
  // if (data.error) {
  //   return <Text>Error: {data.error.message}</Text>;
  // }
  //
  // return (
  //   // <Content>
  //     <FlatList
  //       contentContainerStyle={styles.list}
  //       data={(data.Page) && data.Page.media}
  //       onEndReachedThreshold={1}
  //       horizontal={false}
  //       numColumns={NUM_COLUMNS}
  //       refreshing={data.networkStatus === 4}
  //       onRefresh={() => data.refetch()}
  //       keyExtractor={(item, id) => item.id}
  //       renderItem={_renderItem}
  //       onEndReached={() => {
  //         var nextPage =
  //         data.fetchMore({
  //           variables: { page: data.Page.pageInfo.currentPage + 1 },
  //           updateQuery: (previousResult, { fetchMoreResult }) => {
  //             // Don't do anything if there weren't any new items
  //             if (!fetchMoreResult ||
  //                 (previousResult.Page.pageInfo.currentPage == fetchMoreResult.Page.pageInfo.currentPage)
  //                 || !previousResult.Page.pageInfo.hasNextPage) {
  //               return previousResult;
  //             }
  //
  //             // build pageInfo separately to avoid nested obj shenanigans
  //             var newPageInfo = Object.assign({}, previousResult.Page.pageInfo, fetchMoreResult.Page.pageInfo)
  //
  //             return Object.assign({}, previousResult, {
  //               "Page": {
  //                 "__typename": previousResult.Page.__typename,
  //                 "pageInfo": newPageInfo,
  //                 "media": [
  //                   ...previousResult.Page.media,
  //                   ...fetchMoreResult.Page.media
  //                 ]}
  //             });
  //
  //           },
  //         });
  //       }}
  //     />
  //     // </Content>
  // );
    render() {
      return <View/>
    }

}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component
const PAGE_SIZE = 6;
var currPage = 1;
const ANIME_QUERY = gql`
  query ($page: Int, $perPage: Int, $media: MediaType) {
    Page (page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        hasNextPage
        perPage
      }
      media (type: $media) {
        id
        title {
          romaji
        }
        coverImage {
          large
        }
        bannerImage
      }
    }
  }
`

const styles = StyleSheet.create({
  list: {
    flex: 1,
    flexDirection: 'column'
  }
})

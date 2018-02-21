import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { Picker, List, WhiteSpace } from 'antd-mobile';

import { Media } from '../constants/Config'


function Filters({ data }) {
  console.log(data.__type)

  return (
    <ScrollView>
      <Picker data={Media.sortOptions} cols={1}>
        <List.Item arrow="horizontal">Sort by</List.Item>
      </Picker>

      <WhiteSpace/>
      <Picker data={[Media.seasons, Media.years]} value={[Media.currSeason, Media.currYear]} cascade={false}>
        <List.Item arrow="horizontal">Season</List.Item>
      </Picker>

      <Text>TODO: status, type, genres, tags</Text>
      <Picker data={[Media.seasons, Media.years]} value={[Media.currSeason, Media.currYear]} cascade={false}>
        <List.Item arrow="horizontal">Season</List.Item>
      </Picker>

    </ScrollView>
  )

}

const MEDIA_ENUMS_QUERY = gql`
query {
    __type(name: "MediaStatus") {
       enumValues {
           name
       }
    }
}
`
export default graphql(MEDIA_ENUMS_QUERY, {
  options: {
    notifyOnNetworkStatusChange: true,
  },
  props: ({ ownProps, data }) => ({
    'data': data,
    'value': ownProps.value
  })
})(Filters);

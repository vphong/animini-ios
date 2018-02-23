import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Picker, List } from 'antd-mobile'

function MediaFormatPicker({ ownProps, data }) {
  if (data.error) {
    return <Text>Error: { data.error.message }</Text>;
  }

  // transform data for Picker
  let MEDIA_FORMAT = []
  let items = data.__type;
  if (items && items.enumValues) {
    for (var i = 0; i < items.enumValues.length; i++) {
      var value = items.enumValues[i].name

      var name = value.replace(/[_]/g, ' ').replace(/\B\w/g, function(c) { return c.toLowerCase() })

      MEDIA_FORMAT.push({ 'value': value, 'label': name})
    }

    return (
      <Picker data={MEDIA_FORMAT} cols={1} val={[value]}>
        <List.Item arrow="horizontal">Status</List.Item>
      </Picker>
    )
  }

  return (<Text>Uh oh.</Text>)
}

const MEDIA_FORMAT_QUERY = gql`
query {
    __type(name: "MediaStatus") {
       enumValues {
           name
       }
    }
}
`
export default graphql(MEDIA_STATUS_QUERY, {
  options: {
    notifyOnNetworkStatusChange: true,
  },
  props: ({ ownProps, data }) => ({
    'data': data,
    'value': ownProps.value
  })
})(MediaFormatPicker);

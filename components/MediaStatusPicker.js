import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { Picker, List } from 'antd-mobile'

function MediaStatusPicker({ ownProps, data }) {
  if (data.error) {
    return <Text>Error: { data.error.message }</Text>;
  }

  // transform data for Picker
  let MEDIA_STATUS = []
  let items = data.__type;
  if (items && items.enumValues) {
    for (var i = 0; i < items.enumValues.length; i++) {
      var value = items.enumValues[i].name

      var name = value.replace(/[_]/g, ' ').replace(/\B\w/g, function(c) { return c.toLowerCase() })

      MEDIA_STATUS.push({ 'value': value, 'label': name})
    }

    console.log(value)
    return (
      <Picker data={MEDIA_STATUS} cols={1} val={[value]}>
        <List.Item arrow="horizontal">Status</List.Item>
      </Picker>
    )
  }

  return (<Text>Uh oh.</Text>)
}

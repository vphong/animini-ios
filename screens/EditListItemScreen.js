import React from 'react';
import { View, Text } from 'react-native';

export default class EditListItemScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit List Item',
  };

  render() {
    /* Go ahead and delete ExpoConfigView and replace it with your
     * content, we just wanted to give you a quick view of your config */
    return (
      <View>
        <Text>{JSON.stringify(this.props.navigation.state.params.itemId, null, '\t')}</Text>
      </View>
    )
  }
}

import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';

export default class SearchFilterScreen extends React.Component {
  static navigationOptions = {
    title: 'Filters',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>hi</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

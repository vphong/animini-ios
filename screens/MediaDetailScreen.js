import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, Button } from 'react-native';
import { Header } from 'react-navigation'


export default class MediaDetailScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    console.log(params)

    return {
      title: 'Details',
      headerLeft: <Button title="< Back" onPress={() => navigation.goBack()}/>
    }
  };

  componentDidMount() {
    MEDIA_ITEM = this.props.navigation.state.params.item;
  }

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

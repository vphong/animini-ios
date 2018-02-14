import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { Header } from 'react-navigation'


export default class MediaDetailScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: 'Details',
      header: (
        <View style={{ backgroundColor: '#eee' }}>
          <Image
            style={StyleSheet.absoluteFill}
            source={{ uri: params.item.coverImage.large }}
          />
          <Header style={{ backgroundColor: 'transparent' }}/>
        </View>
      ),
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

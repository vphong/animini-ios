import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  Modal
} from 'react-native';
import { WebBrowser } from 'expo';
import { Ionicons } from '@expo/vector-icons'

import { MonoText } from '../components/StyledText';
import UserCard from '../components/UserCard';
import MediaList from '../components/Media';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  optionsButton: {
    marginRight: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },
});


export default class BrowseScreen extends React.Component {

  static navigationOptions = ({ navigation })  => {
    // console.log(state)
    return {
      headerTitle: "Anime",
      headerRight:
        <Ionicons
            name="ios-options"
            size={24}
            style={styles.optionsButton}
            onPress={() => navigation.navigate('Filters')}
            />
    }
  };


  render() {

    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


          <View>

            <MediaList navigation={this.props.navigation}/>


          </View>

        </ScrollView>

      </View>
    );
  }

}

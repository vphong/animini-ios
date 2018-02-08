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
  }
});

class OptionsButton extends React.Component {
  render () {

  }
}

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation })  => {
    return {
      headerTitle: "Anime",
      headerRight:
        <Ionicons
            name="ios-options"
            size={24}
            style={styles.optionsButton}
            onPress={() => {console.log("NAVIGATE"); navigation.navigate('SearchFilterScreen')}}
            />
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


          <View>

            <MediaList/>


          </View>

        </ScrollView>

      </View>
    );
  }

}

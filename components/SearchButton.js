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

import { SearchBar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

class SearchButtons extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      "isExpanded": false,
    }

    this._onPress = this._onPress.bind(this)
  }

  _onPress() {
    console.log("pressed search button")
    this.setState(previousState => {
      return {"isExpanded": !previousState.isExpanded}
    })
    console.log(this.state.isExpanded)
  }

  render() {
    return (
      <View>
        <Ionicons name="ios-search" size={20} style={styles.searchButton} onPress={this._onPress}/>
        <SearchBar
          showLoading
          platform="ios"
          cancelButtonTitle="Cancel"
          noIcon="true"
          placeholder='Search' />
      </View>
  )}
}

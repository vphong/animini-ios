import React from 'react';
import { Animated, TouchableOpacity, StyleSheet } from 'react-native';
import { DangerZone } from 'expo';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import view from '../assets/lottie/View.json';

const DETAIL = "view-list", CARD = "view-dashboard";

export class ViewIcon extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      status: DETAIL
    }
    this._onPressView = this._onPressView.bind(this);
  }


  _onPressView = () => {
    // this.view.play();
    // console.log(this.view)
    if (this.state.status == DETAIL) {
      this.setState({ status: CARD })
    }
    else {
      this.setState({ status: DETAIL })
    }
    // this.view.play()
  }

  render() {
    return (
      <TouchableOpacity onPress={this._onPressView} style={styles.container}>
        <MaterialCommunityIcons name={this.state.status} size={24}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
    viewIcon: {
      width: 150,
      height: 150,
      marginLeft: -30,
      marginTop: -30,
      padding: 3,
    },
    container: {
      paddingLeft: 10,
      paddingRight: 15
    }
})

import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo';
import { Ionicons } from '@expo/vector-icons'

const INCLUDED = "included", EXCLUDED = "excluded", IGNORED = "ignored";

export class IndeterminateCheckboxes extends React.Component {

  constructor(props) {
    super(props);

    let data = []

    this.state = {
      included: this.props.data,
      excluded: [],
      data: []
    };

    this._cycleState = this._cycleState.bind(this);
  }

  componentWillReceiveProps(newProps) {

    if (this.props.data !== newProps.data) {
      this.setState({
        data: newProps.data.map(item => Object.assign({}, item, {
          selected: IGNORED,
          icon: "ios-radio-button-on",
          gradientColors: ['#D4D4D4', '#A0A0A0'],
        }))
      })
    }

  }


  _cycleState(item) {

    console.log("cycling")

    // find item in state
    var dataCopy = this.state.data
    var itemState = dataCopy.find(x => x.value === item.value )

    switch(itemState.selected) {

      case INCLUDED:
        itemState.selected = EXCLUDED;
        itemState.icon = "ios-close-circle";
        itemState.gradientColors = ['#ffb199', '#ff0844'];
        break;

      case EXCLUDED:
        itemState.selected = IGNORED;
        itemState.icon = "ios-radio-button-on";
        itemState.gradientColors = ['#D4D4D4', '#A0A0A0'];
        break;

      case IGNORED:
        itemState.selected = INCLUDED;
        itemState.icon = "ios-checkmark-circle";
        itemState.gradientColors = ['#54f59c', '#10CABA'];
        break;

      default:
        itemState.selected = IGNORED;
        itemState.icon = "ios-radio-button-on";
        itemState.gradientColors = ['#D4D4D4', '#A0A0A0'];
        break;

    }
    console.log(item)


    this.setState({ data: dataCopy });
  }


  render() {
    let genre = this.props.genre;
    let selected = this.state.selected;
    let icon = "ios-radio-button-on";
    let gradientColors = ['#54f59c', '#10CABA'];
    if (this.state.selected === INCLUDED) {
      icon = "ios-checkmark-circle";
      gradientColors = ['#54f59c', '#10CABA'];
    }
    else if (this.state.selected === EXCLUDED) {
      icon = "ios-close-circle";
      gradientColors = ['#ffb199', '#ff0844']
    }
    return (
      <View style={styles.container}>

        {
          this.state.data.map((item,i) => (
          <TouchableOpacity key={i} onPress={() => this._cycleState(item)} style={styles.badge}>
            <LinearGradient
              colors={item.gradientColors}
              start={[1,0]} end={[0,.9]}
              style={styles.gradient}>

              <Ionicons name={item.icon} color="white" size={17} style={styles.icon}/>
              <Text style={styles.text}> {item.label} </Text>
            </LinearGradient>

          </TouchableOpacity>)
        )}


      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  badge: {
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  gradient: {
    borderRadius: 20,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    fontSize: 16,
    color: 'white'
  },
  icon: {
    marginTop: 2,
    marginLeft: 2
  }
})

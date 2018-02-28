import React from 'react';
import gql from 'graphql-tag';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo';
import { FontAwesome } from '@expo/vector-icons'

const INCLUDED = "included", EXCLUDED = "excluded", IGNORED = "ignored";
const ICON_IN = "check-circle", ICON_EX = "times-circle", ICON_IG = "circle-o"

export class IndeterminateCheckboxes extends React.Component {

  constructor(props) {
    super(props);

    let data = []

    this.state = {
      ignored: this.props.data,
      included: [],
      excluded: [],
      data: []
    };

    this._cycleState = this._cycleState.bind(this);
  }

  componentWillReceiveProps(newProps) {

    if (this.props.data !== newProps.data) {
      let newData = newProps.data.map(item => Object.assign({}, item, {
        selected: IGNORED,
        icon: ICON_IG,
        gradientColors: ['#D4D4D4', '#A0A0A0'],
      }))
      this.setState({
        ...this.state,
        data: newData,
      });

      this.props.onGenreChange({
        ignored: newData.map(item=>item.value)
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
        itemState.icon = ICON_EX;
        itemState.gradientColors = ['#ffb199', '#ff0844'];
        break;

      case EXCLUDED:
        itemState.selected = IGNORED;
        itemState.icon = ICON_IG;
        itemState.gradientColors = ['#D4D4D4', '#A0A0A0'];
        break;

      case IGNORED:
        itemState.selected = INCLUDED;
        itemState.icon = ICON_IN;
        itemState.gradientColors = ['#54f59c', '#10CABA'];
        break;

      default:
        itemState.selected = IGNORED;
        itemState.icon = ICON_IG;
        itemState.gradientColors = ['#D4D4D4', '#A0A0A0'];
        break;

    }



    this.setState({ ...this.state, data: dataCopy });

    let ignored = _.filter(this.state.data, function(o) { return o.selected == IGNORED; })
    ignored = _.map(ignored, "value");

    let included = _.filter(this.state.data, function(o) { return o.selected == INCLUDED; })
    included = _.map(included, "value");

    let excluded = _.filter(this.state.data, function(o) { return o.selected == EXCLUDED; })
    excluded = _.map(excluded, "value");

    this.props.onGenreChange({

        'ignored': ignored,
        'included': included,
        'excluded': excluded
    })
  }


  render() {
    let genre = this.props.genre;
    let sfw = this.state.data.filter(item => !item.isAdult);

    return (
      <View style={styles.container}>

        {
          sfw.map((item,i) => (

              <TouchableOpacity key={i} onPress={() => this._cycleState(item)} style={styles.badge}>
                {
                  item.selected != IGNORED ?
                    <LinearGradient
                      colors={item.gradientColors}
                      start={[1,0]} end={[0,.9]}
                      style={styles.gradient}>

                      <FontAwesome name={item.icon} color="white"  style={styles.icon}/>
                      <Text style={styles.text}> {item.label} </Text>
                    </LinearGradient>

                :
                  <View style={[styles.gradient, styles.containerIgnored]}>

                    <FontAwesome name={item.icon} color="darkgray" style={styles.icon}/>
                    <Text style={[styles.text, styles.textIgnored]}> {item.label || item.name} </Text>
                  </View>
                }
              </TouchableOpacity>

          )
        )
      }


      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
    padding: 10
  },
  badge: {
    marginBottom: 7,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  gradient: {
    borderRadius: 20,
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth+1,
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white'
  },
  textIgnored: {
    color: 'darkgray'
  },
  containerIgnored: {
    backgroundColor: 'white',
    borderColor: 'darkgray',
  },
  icon: {
    fontSize: 18
  }
})

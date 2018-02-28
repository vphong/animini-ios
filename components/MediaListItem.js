import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Animated
 } from 'react-native';
import { Card, CardItem, Left, Body, Right, Button, Icon, Badge } from 'native-base';
import { Divider } from 'react-native-elements';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { MaterialIcons } from '@expo/vector-icons';
import { labelFormat } from 'animini/constants/Config';

import { Ionicons } from '@expo/vector-icons'

import Colors from '../constants/Colors'

export class MediaListItem extends React.Component {

   _defaultTransition = 250;

   state = {
       _rowOpacity : new Animated.Value(0)
   };

  componentDidMount() {
    Animated.timing(this.state._rowOpacity, {
        toValue  : 1,
        duration : this._defaultTransition
    }).start()
  }


  render() {
    let item = this.props.item;
    return (
      <Animated.View style={[{opacity: this.state._rowOpacity}, styles.itemContainer]}>

        <TouchableOpacity
          onPress={() => this.props.navigation.push('Details', {'item': item})}
          style={{ flexDirection: 'row', height: 120 }}>

          <Grid>

            <Col size={1}>
              <Image source={{uri: item.coverImage.medium}} style={{height: 100, width: 75, flex: 1, margin: 5, borderRadius: 2 }}/>
            </Col>

            <Col size={3} style={{ paddingTop: 7, paddingBottom: 7, paddingLeft: 5, paddingRight: 5 }}>

              <Row size={65} style={{borderBottomWidth: StyleSheet.hairlineWidth, borderColor: 'lightgray'}}>
                <Col style={{ justifyContent: 'space-around' }}>

                  <Row style={{ alignItems: 'center'}}>
                    <View style={{flex: 1}}>
                    <Text style={{ fontWeight: 'bold', fontSize: 17, lineHeight: 17 }} numberOfLines={1}>
                    { item.title.userPreferred }
                    </Text></View>
                  </Row>
                  <Row>
                    <Text style={{ fontSize: 14, opacity: .8}} numberOfLines={1}>
                      { `by ${ item.studios.nodes[0].name }` }
                    </Text>
                  </Row>
                  <Row>
                    <Text style={{ fontSize: 12, opacity: .7,}} numberOfLines={1}>
                      { `${item.format} • ${labelFormat(item.season)} ${item.startDate.year}` }
                    </Text>
                  </Row>
                </Col>
              </Row>
              <Row size={35} style={{paddingTop: 3}}>
                <Col style={{ justifyContent: 'space-around'}}>
                  <Text style={{ opacity: .75, fontSize: 14 }} numberOfLines={1}>{item.genres.join(', ')}</Text>

                  <Text style={{ opacity: .75, fontSize: 11 }} numberOfLines={1}>{item.tags.map(tag => `${tag.name}`).join(', ')}</Text>

                </Col>
              </Row>
            </Col>

          </Grid>

        </TouchableOpacity>
        <View style={styles.interactContainer}>
          <View style={[styles.interactButton]}>
            <Text style={styles.interactText}>Score: {item.averageScore.toLocaleString('en-US')}%</Text>
          </View>
          <View style={[styles.interactButton]}>
            <Text style={[styles.interactText, {paddingLeft: 10}]}> {`${item.popularity.toLocaleString('en-US')} `}</Text>
            <Icon name="ios-flame" style={{fontSize: 14, color: 'hsla(0,0%,0%,.3)'}}/>
          </View>
          <TouchableOpacity style={styles.interactButton} onPress={() => this.props.navigation.navigate('EditItem', {'itemId': item.id})}>
            <Icon name="md-add-circle" style={{fontSize: 14, color: 'rgb(103,186,248)'}}/>
            <Text style={[styles.interactText, { color: 'rgb(103,186,248)' }]}> Add to List</Text>
          </TouchableOpacity>
        </View>

      </Animated.View>
    )
  }

}
  // </Badge>
const styles = StyleSheet.create({
  badge: {
    backgroundColor: 'hsla(0,0%,0%,.05)',
    // borderWidth: StyleSheet.hairlineWidth+1,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    padding: 0,
  },
  badgeText: {
    color: 'hsla(0,0%,0%,.45)',
    fontSize: 12,
    margin: 0
  },
  itemContainer: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 0,
    borderRadius: 5,
    backgroundColor: 'white',
    shadowColor: 'hsl(0,0%,0%)',
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 8,
    shadowOpacity: 1,

    // borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(0,0,0,.3)',
    overflow: 'hidden'
  },
  interactContainer: {
    backgroundColor: 'hsla(200,20%,80%,.15)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  interactButton: {
    padding: 10,
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
    flexDirection: 'row',
  },
  interactText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'hsla(0,0%,0%,.25)'
  },
})

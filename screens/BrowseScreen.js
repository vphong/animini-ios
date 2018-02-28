import React from 'react';
import { StyleSheet, ScrollView, View, Platform, StatusBar, SafeAreaView, Animated, TouchableOpacity } from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import Colors from '../constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import Layout from '../constants/Layout'
import { LinearGradient, Constants } from 'expo';

import { WingBlank, Flex, SearchBar } from 'antd-mobile';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content, Text, Footer, FooterTab, Item, Input } from "native-base";
import SlidingUpPanel from 'rn-sliding-up-panel';
import { ViewIcon } from '../components/ViewIcon';
import { MediaList } from '../components/graphql/MediaList';
import { Filters } from '../components/graphql/Filters'

const mediaOptions = [
  { value: 'ANIME', label: 'Anime'},
  { value: 'MANGA', label: 'Manga'},
]



let panelHeight = 125

export default class BrowseScreen extends React.Component {


  static defaultProps = {
    draggableRange: {
      top: Layout.window.height / 1.20,
      bottom: panelHeight,
    }
  }
  _draggedValue = new Animated.Value(-panelHeight)

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      mediaTypeLabel: 'Anime',
      mediaTypeValue: 'ANIME',
      selectedFilters: [],
      panelOpen: false,
    }

    this._selectMediaType = this._selectMediaType.bind(this)
    this._onFilterChange = this._onFilterChange.bind(this)
    this.toggleFilters = this.toggleFilters.bind(this)
  }
  filters = null;

  _selectMediaType(mediaType) {
    this.setState({
      mediaTypeLabel: mediaType,
      mediaTypeValue: mediaType.toUpperCase()
    })
  }

  _onFilterChange = (val) => {
    this.setState({
      ...this.state,
      filters: {
        ...val
      }
    })
  }

  toggleFilters = () => {

    if (!this.state.panelOpen) {
      this._panel.transitionTo(this.props.draggableRange.top)
    }
    else {
      this._panel.transitionTo(this.props.draggableRange.bottom)
    }

    this.setState({
      ...this.state,
      // check if panel is positioned to open state
      // more thorough than simple toggle !panelOpen
      panelOpen: (this._draggedValue != this.props.draggableRange.top)
    })
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
         <LinearGradient
            colors={[Colors.tintColor, '#9DCEFF']}
            start={[1,0]} end={[.99,.99]}
            style={{width: Layout.window.width, flexDirection: 'row', alignItems: 'center'}}
            >
            <Left/>
            <Body><Title style={{fontWeight: 'bold'}}>{this.props.navigation.state.routeName}</Title></Body>

            <Right><ViewIcon/></Right>
          </LinearGradient>
        </Header>

        <MediaList navigation={this.props.navigation} client={this.props.client} queryVars={this.state.filters} />

        <SlidingUpPanel
          visible
          showBackdrop={this.state.panelOpen}
          ref={(c) => {this._panel = c}}
          draggableRange={this.props.draggableRange}
          onDrag={(v) => {
            if (v == -this.props.draggableRange.bottom) {
              this.setState({
                ...this.state,
                panelOpen: false
              })
            }
            else this.setState({ ...this.state, panelOpen: true })
            this._draggedValue.setValue(v);
          }}
          onRequestClose={() => this.setState({ ...this.state, panelOpen: false })}>

          <View style={styles.panel}>
            <View style={styles.panelHeader}>
              <View style={{flex: 1, padding: 0}}>
                <SearchBar value={this.state.search} placeholder="Search" />
              </View>
              <TouchableOpacity onPress={this.toggleFilters} style={{paddingLeft: 10, paddingRight: 10}}>
                <Ionicons name={this.state.panelOpen ? "ios-close-circle" : "ios-funnel"} size={22}/>
              </TouchableOpacity>
            </View>
            <View>
              <Filters onFilterChange={this._onFilterChange}/>
            </View>
          </View>
        </SlidingUpPanel>

      </Container>
    );
  }

}


const styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0,
    shadowColor: 'transparent',
    elevation: 0,
    backgroundColor: Colors.tintColor
  },
  panelHeader: {
    // height: 120,
    // padding: 5,
    flexDirection: 'row',
    backgroundColor: '#efeff4',
    alignItems: 'center',
  },
  panel: {
    flex: 1,
    backgroundColor: Colors.containerBg,
    position: 'relative'
  },
  statusBar: {
    backgroundColor: Colors.tintColor,
    height: Constants.statusBarHeight
  },
  optionsButton: {
    marginRight: 10,
  },
  picker: {
    ...Platform.select({
      ios: {
        width: 75,
      },
    })
  },
  pickerText: {
    ...Platform.select({
      ios: {
        fontSize: 14,
      },
    })
  }
});

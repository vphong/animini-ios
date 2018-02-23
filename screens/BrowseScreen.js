import React from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import { Ionicons } from '@expo/vector-icons'

import { UserCard } from '../components/UserCard';
import { MediaList } from '../components/Media';

const mediaOptions = [
  { value: 'ANIME', label: 'Anime'},
  { value: 'MANGA', label: 'Manga'},
]
// <Picker
//     selectedValue={this.state.browsing}
//     onValueChange={(v) => this.setState({browsing: v})}
//     mode="dialog" style={styles.picker} textStyle={styles.pickerText}
//   >
//     <Picker.Item label="Anime" value="ANIME" />
//     <Picker.Item label="Manga" value="MANGA" />
//   </Picker>
export default class BrowseScreen extends React.Component {

  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props);

    this.state = {
      mediaTypeLabel: 'Anime',
      mediaTypeValue: 'ANIME'
    }

    this._selectMediaType = this._selectMediaType.bind(this)
  }

  _selectMediaType(mediaType) {
    this.setState({
      mediaTypeLabel: mediaType,
      mediaTypeValue: mediaType.toUpperCase()
    })
    console.log(this.state)
  }

  render() {
    console.log(this.state.media)
    return (
      <Container>
        <Header>
          <Left>
          <Menu>
            <MenuTrigger text={this.state.mediaTypeLabel} />
            <MenuOptions>
              <MenuOption text="Anime" onSelect={() => this._selectMediaType("Anime")} />
              <MenuOption text="Manga" onSelect={() => this._selectMediaType("Manga")} />
            </MenuOptions>
          </Menu>
          </Left>
          <Right>
            <Ionicons name="ios-options" size={24} onPress={() => this.props.navigation.navigate('Filters')}/>
          </Right>
        </Header>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


          <View>

            <MediaList navigation={this.props.navigation} media={this.state.mediaTypeValue}/>


          </View>

        </ScrollView>

      </Container>
    );
  }

}


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

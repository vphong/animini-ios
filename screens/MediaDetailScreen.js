import React from 'react';
import { ScrollView, StyleSheet, View, Image, AsyncStorage } from 'react-native';
import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Left,
  Right,
  Icon,
  Title,
  Button,
  Thumbnail
} from "native-base";
import Layout from '../constants/Layout'
import {MediaDetail} from '../components/graphql/MediaDetail'


export default class MediaDetailScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;

    return {
      title: 'Details',
      header: (
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{params.item.title.romaji}</Title>
        </Body>
        <Right />
      </Header>
    )
    }
  };

  constructor(props) {
    super(props);

    this._renderHeader = this._renderHeader.bind(this)
  }

  _renderHeader(item) {
    if (item.bannerImage) {
    return (
      <Content>
        <View>
          <Image source={{uri: item.bannerImage}} resizeMode="cover" style={{height: Layout.window.height/3, width: Layout.window.width}}/ >
        </View>
        <Text style={{position: 'absolute', color: '#fff'}}>{item.title.romaji}</Text>
      </Content>
    )}
    return <View/>;
  }

  render() {
    let item = this.props.navigation.state.params.item;
    console.log("MediaDetailScreen: ")
    console.log(item.id)
    return (

      <MediaDetail id={this.props.navigation.state.params.item.id}/>
    )
  };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

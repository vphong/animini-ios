import React from 'react';
import { ScrollView, View, StyleSheet, Image } from 'react-native';
import {
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Left,
  Right,
  Icon,
  Title,
  Button,
  Thumbnail
} from "native-base";

// import { ItemHeader } from 'animini/components/Header'

export class MediaDetail extends React.Component {

  constructor(props) {
    super(props);

    
  }

  render() {
    console.log(this.props)
    return( <View/>)
  }

}
const MEDIA_DETAILS_QUERY = `
query($id: Int!) {
  Media(id: $id) {
    coverImage {
      large
      medium
    }
    bannerImage
		title {
		  romaji
		  english
		  native
		  userPreferred
		}
    description
  }
}
`

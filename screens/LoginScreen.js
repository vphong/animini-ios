import React from 'react';
import { ScrollView, StyleSheet, WebView } from 'react-native';
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
import { Anilist } from '../constants/Config';
import Layout from '../constants/Layout';
import { signIn, signOut, getToken } from '../api/Auth';
import qs from 'qs';

/** TODO: detach and make sure login/out is smooth with cookie manager or expo webbrowser**/

var anilistAuth = Anilist.apiAuth + `?client_id=${Anilist.clientId}&response_type=token`

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  constructor(props) {
    super(props);

    this.state = {
      nav: null
    };

    this._onNavigationStateChange = this._onNavigationStateChange.bind(this)
    this._onMessage = this._onMessage.bind(this)
  }

  componentWillUpdate() {
    let nav = this.state.nav
    if (nav && nav.url.includes("access_token")) {
      this.props.navigation.navigate.goBack()
    }
  }

  async _onNavigationStateChange (e) {
    this.setState({ nav: e })

    let authResult = qs.parse(e.url);
    for (key in authResult) {
      if (key.includes("access_token")) {
        signIn(authResult[key]);
        this.setState({ isLoggedIn: true });
        return
      }
    }

  }

  render() {

    return (
      <Container>
        <WebView source={{uri: anilistAuth}}
          style={{ flex: 1 }}
          onNavigationStateChange={this._onNavigationStateChange}
          />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});

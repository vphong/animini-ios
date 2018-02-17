import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Text,
  Button,
  Linking
} from 'react-native';
import Colors from '../constants/Colors';
import Anilist from '../constants/Config';
import Expo, { AuthSession, WebBrowser, Constants } from 'expo';

export class LoginButton extends React.Component {
  state = {
    redirectData: null,
  };

  _onPress = async () => {


    this._addLinkingListener();
    let result = await WebBrowser.openAuthSessionAsync(
      `https://anilist.co/api/v2/oauth/authorize?response_type=token`+
      `&client_id=${Anilist.clientId}&redirect_uri=`
    );
    this._removeLinkingListener();
    this.setState({ result });

  }

   _handleRedirect = event => {
    WebBrowser.dismissBrowser();

    console.log(event)
    let query = event.url.replace(Constants.linkingUri, '');
    let data;
    if (query) {
      data = qs.parse(query);
    } else {
      data = null;
    }

    this.setState({ redirectData: data });
    console.log(data)
  };


  _addLinkingListener = () => {
    Linking.addEventListener('url', this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
  };
  _maybeRenderRedirectData = () => {
    if (!this.state.redirectData) {
      return;
    }

    return <Text>{JSON.stringify(this.state.redirectData)}</Text>;
  };
  render() {
    return (
      <View>
        <Button title="Log in to Anilist" style={styles.loginButton} onPress={this._onPress}/>

        {this._maybeRenderRedirectData()}
      </View>
  )}
}

const styles = {
  loginButton: {
    color: Colors.tintColor,
    backgroundColor: Colors.tintColor
  }
}

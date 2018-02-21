import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';

import { getToken, signOut } from '../api/Auth';

import UserCard  from '../components/UserCard'


export default class UserScreen extends React.Component {
  static navigationOptions = {
    title: 'Profile',
  };

  constructor(props) {
    super(props)

    this.state = { isLoggedIn: false };

    let token = getToken()
    console.log(this.state)
    this._logout = this._logout.bind(this)
  }

  _logout() {
    console.log("_logout")
    signOut()
    console.log(getToken())
    this.setState({ isLoggedIn: false })
    console.log(this.state)
  }

  render() {
    return (
      <ScrollView style={styles.container}>

         <Button
           onPress={() => this.props.navigation.navigate('Login')}
           title="Tap here to try it out"
         />
         <Button title="Logout" onPress={() => this._logout()}/>
      </ScrollView>
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

import React from 'react';
import { ScrollView, StyleSheet, Text, Button } from 'react-native';
import { LoginButton } from '../components/LoginButton'

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
         <LoginButton/>
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

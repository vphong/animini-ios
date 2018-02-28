import { Notifications } from 'expo';
import React from 'react';
import { StackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import MainTabNavigator from './MainTabNavigator';
import SearchFilterScreen from '../screens/SearchFilterScreen';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import MediaDetailScreen from '../screens/MediaDetailScreen';

const RootStackNavigator = StackNavigator(
  {
    Tabs: { screen: MainTabNavigator },
    Login: { screen: LoginScreen },
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: 'normal',
      },
    }),
    headerMode: 'none',
  }
);

export default class RootNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    console.log(this.props.client)
    return <RootStackNavigator client={this.props.client} />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({ origin, data }) => {
    console.log(`Push notification ${origin} with data: ${JSON.stringify(data)}`);
  };
}

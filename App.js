import React from 'react';
import RootContainer from './RootContainer';

import enUS from 'antd-mobile/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd-mobile';
import { MenuProvider } from 'react-native-popup-menu';

import { getToken } from './api/Auth';


export default class App extends React.Component {

  render() {

    return (
      <LocaleProvider locale={enUS}>
          <MenuProvider>
            <RootContainer/>
          </MenuProvider>
      </LocaleProvider>
    );
  }
}

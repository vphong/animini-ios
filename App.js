import React from 'react';
import RootContainer from './RootContainer';

import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { persistCache } from 'apollo-cache-persist';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { AsyncStorage } from 'react-native'

import enUS from 'antd-mobile/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd-mobile';
import { MenuProvider } from 'react-native-popup-menu';

import { getToken } from './api/Auth';

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

persistCache({
  cache,
  storage: AsyncStorage,
  trigger: 'background',
});

const httpLink = new HttpLink({ uri: 'https://graphql.anilist.co'});
var cli;
const token = getToken();
console.log(AsyncStorage.getItem("access_token"))

// if (token) {
//   const authLink = setContext(async (req, { headers }) => {
//     // get the authentication token from local storage if it exists
//     // return the headers to the context so httpLink can read them
//     if (token) {
//       isLoggedIn = true;
//       return {
//         headers: {
//           ...headers,
//           authorization: `Bearer ${token}`,
//         }
//       }
//     }
//
//     return;
//   });
//   cli = new ApolloClient({
//     link: authLink.concat(httpLink),
//     cache
//   })
// }
// else {
  cli = new ApolloClient({
    link: httpLink,
    cache
  })
// }


export const client = cli;

export default class App extends React.Component {

  render() {

    return (
      <LocaleProvider locale={enUS}>
        <ApolloProvider client={client} >
          <MenuProvider>
            <RootContainer/>
          </MenuProvider>
        </ApolloProvider>
      </LocaleProvider>
    );
  }
}

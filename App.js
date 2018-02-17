import React from 'react';
import RootContainer from './RootContainer';

import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo';

import enUS from 'antd-mobile/lib/locale-provider/en_US';
import { LocaleProvider } from 'antd-mobile';

const client = new ApolloClient({
    link: new HttpLink({ uri: 'https://graphql.anilist.co'}),
    cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});

export default class App extends React.Component {

  render() {

    return (
      <LocaleProvider locale={enUS}>
        <ApolloProvider client={client}>
          <RootContainer/>
        </ApolloProvider>
      </LocaleProvider>
    );
  }
}

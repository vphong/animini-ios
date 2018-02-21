import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { MonoText } from './StyledText'

// The data prop, which is provided by the wrapper below contains,
// a `loading` key while the query is in flight and posts when ready
function UserCard({ data }) {
  if (data.loading) {
    return <Text>Loading</Text>;
  } else if (data.error) {
    console.log(data)
    return (
      <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
        <MonoText style={styles.codeHighlightText}>{data.error.message}</MonoText>
      </View>
    )
  } else {
    return (
      <View style={[styles.codeHighlightContainer, styles.homeScreenFilename]}>
          <MonoText style={styles.codeHighlightText}>{JSON.stringify(data.Viewer, null, 2)}</MonoText>
      </View>
    );
  }
}

// The `graphql` wrapper executes a GraphQL query and makes the results
// available on the `data` prop of the wrapped component
const VIEWER_QUERY = gql`
query {
  Viewer {
    id
    name
    bannerImage
    avatar {
      large
    }
  }
}
`
export default graphql(VIEWER_QUERY, {
  options: {
  }
})(UserCard);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});

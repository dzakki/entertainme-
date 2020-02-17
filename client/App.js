import React, { useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ApolloProvider } from '@apollo/react-hooks';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import apolloClient from './config/graphql';
import RootNavigation from './navigation/RootNavigation';

export default function App() {

  useEffect(() => {
    Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  }, [])

  return (
    <ApolloProvider client={apolloClient}>
      <NavigationContainer>
        <StatusBar backgroundColor="black" barStyle="dark-content" />
        <View style={{ marginTop: Constants.statusBarHeight }} />
        <RootNavigation />
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

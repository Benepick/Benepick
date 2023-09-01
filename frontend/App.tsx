import React from 'react';
import { Text, View } from 'react-native';
import Router from './src/router/Router';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './src/pages/Start/Start';
import Home from './src/pages/Home/Home';

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return <Router />;
}

export default App;

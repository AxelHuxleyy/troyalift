import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import MainNavigator from './navigation/MainNavigator.js';


export default class App extends React.Component {
  render() {
    return (
          
      
        <MainNavigator/>
    );
  }
}   

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003580',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Home from './src/pages/Home';
import Constants from 'expo-constants';

export default function App() {
  return ( 
    <View style={styles.container}>
      <Home />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
});
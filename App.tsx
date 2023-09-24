/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import ColorMatchScreen from './src/screen/ColorMatchScreen';


function App(): JSX.Element {
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={'light-content'}
      />
      <ColorMatchScreen />
     
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container : {
  backgroundColor : "white",
  flex : 1
 }
});

export default App;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, ScrollView, StatusBar, StyleSheet} from 'react-native';
import ColorMatchScreen from './src/screen/ColorMatchScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style = {{flex: 1}}>
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      
        <ColorMatchScreen />
     
    </SafeAreaView>
     </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
});

export default App;

import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AnimatableCircle = ({index, backgroundColor}) => {
  return <View style={[styles.colorContent, {backgroundColor}]} key={index} />;
};

export default AnimatableCircle;

const styles = StyleSheet.create({
  colorContent: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});

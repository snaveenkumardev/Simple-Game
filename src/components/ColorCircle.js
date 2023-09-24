import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ColorCircle = ({index, colorText, reference, setColorsPosition}) => {
  return (
    <View
      style={styles.colorContent}
      key={index}
      // ref={reference}
      onLayout={({nativeEvent : {layout}}) => {
        console.log(colorText,layout);
        setColorsPosition((colorspositions)=> {
          return {...colorspositions, [reference]: {X: layout.x, Y: layout.y}}
        })
      }}>
      <Text>{colorText}</Text>
    </View>
  );
};

export default ColorCircle;

const styles = StyleSheet.create({
  colorContent: {
    width: 123,
    height: 123,
    borderWidth: 1,
    borderRadius: 123,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

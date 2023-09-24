import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ColorCircle from '../components/ColorCircle';
import AnimatableCircle from '../components/AnimatableCircle';
import {useAnimatedRef, measure, runOnUI} from 'react-native-reanimated';

const ColorMatchScreen = () => {
  //Reference
  // const firstColorRef = useAnimatedRef();
  // const secondColorRef = useAnimatedRef();
  // const thirdColorRef = useAnimatedRef();

  const [colorsData, setColorsData] = useState({
    colors: ['red', 'green', 'yellow'],
    references: ['firstColor', 'secondColor', 'thirdColor'],
  });
  const [colorsPosition, setColorsPosition] = useState({
    firstColor: '',
    secondColor: '',
    thirdColor: '',
  });

  // function check() {
  //      colorsData.references.forEach((reference, index)=> {
  //         runOnUI(() => {
  //             const measurement = measure(reference);
  //             if (measurement === null) {
  //                 console.log("null")
  //               return;
  //             }
  //             console.log(colorsData.colors[index], measurement)

  //             // ...
  //           })();

  //     })
  //     console.log("Get position done")
  // }

  return (
    <View style={styles.container}>
      {/* Color Questions */}
      <View style={[styles.colorContainer, {marginTop: 40}]}>
        {colorsData.colors.map((color, index) => {
          return (
            <ColorCircle
              index={index}
              colorText={color}
              reference={colorsData.references[index]}
              setColorsPosition={setColorsPosition}
            />
          );
        })}
      </View>

      {/* Color options */}
      <View style = {styles.colorOptionsContainer}>
        <View style={[styles.colorContainer]}>
          {colorsData.colors.map((color, index) => {
            return <AnimatableCircle index={index + 1} backgroundColor = {color}/>;
          })}
        </View>
      </View>
    </View>
  );
};

export default ColorMatchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  colorOptionsContainer: {
    position: 'absolute',
    bottom: 60,
    width : "100%"
  },
});

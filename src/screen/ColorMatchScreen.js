import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useEffect, useState} from 'react';
import ColorCircle from '../components/ColorCircle';
import AnimatableCircle from '../components/AnimatableCircle';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, runOnJS, measure, useAnimatedRef} from 'react-native-reanimated';

const ColorMatchScreen = () => {
  //Reference
  // const firstColorRef = useAnimatedRef();
  // const secondColorRef = useAnimatedRef();
  // const thirdColorRef = useAnimatedRef();

  const {weight, height} = useWindowDimensions()

  // Shared value
  const pressed = useSharedValue("");
  const offsetX = useSharedValue(0)
  const offsetY = useSharedValue(0)
  
  // Reference
  const firstColorRef = useAnimatedRef();
  const secondColorRef = useAnimatedRef();
  const thirdColorRef = useAnimatedRef();


  const [colorsData, setColorsData] = useState({
    colors: ['red', 'green', 'yellow'],
    references: ['firstColor', 'secondColor', 'thirdColor'],
    animationRef: [firstColorRef, secondColorRef, thirdColorRef]
  });
  const [colorsPosition, setColorsPosition] = useState({
    firstColor: '',
    secondColor: '',
    thirdColor: '',
  });
  const [colorsOptionPosition, setColorsOptionPosition] = useState({
    firstColor: '',
    secondColor: '',
    thirdColor: '',
  });

  const [selectedColor, setSelectedColor] = useState("")

  useEffect(()=> {
    console.log(colorsOptionPosition, "color option")
  }, [colorsOptionPosition])

  useEffect(()=> {
    console.log(colorsPosition, "color position")
  },[colorsPosition])

  const pan = Gesture.Pan()
    .onBegin((event) => {
      // console.log(event)
      if (event.absoluteX >= colorsOptionPosition.thirdColor.X) {
        console.log(colorsOptionPosition.thirdColor, "color value")
        runOnJS(setSelectedColor)("yellow")
      }  else if (event.absoluteX >= colorsOptionPosition.secondColor.X) {
        runOnJS(setSelectedColor)("green") 
      }  else {
        runOnJS(setSelectedColor)("red")
      }
      pressed.value = true;
    })
    .onChange(event => {
      // console.log(event)
      offsetX.value =  event.translationX;
      offsetY.value =  event.translationY
    })
    .onFinalize(() => {
      pressed.value = false;
      const measurement = measure(firstColorRef);
      if (measurement === null) {
        console.log("Animated ref null");
      } else {
        let {pageX, pageY} = measurement
        let {X, Y} = colorsPosition["firstColor"]
        if (selectedColor == "red") {
          if (pageX >= X && pageX <= Math.ceil(X + 123/5) && pageY <=Math.ceil(Y/2)) {
            console.log("Correct")
          } else {
            console.log("Wrong")
          }
        }
      }
      offsetX.value = 0;
      offsetY.value = 0;
    });

    const animatedStyles = useAnimatedStyle(() => ({
      transform: [
        { scale: withTiming(pressed.value ? 1.2 : 1) },
        {translateX: offsetX.value},
        {translateY: offsetY.value}
      ],
    }));
  
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
            return (
              <View key={index} onLayout={({nativeEvent : {layout}}) => {
                console.log(layout.x, layout.y, color, "color option")
                // if (index == 0) {
                //   offsetFirstColor.value = {X: layout.x, Y: height - 160}
                // } else if (index == 1) {
                //   offsetSecondColor.value = {X: layout.x, Y: height - 160}
                // } else {
                //   offsetThirdColor.value = {X: layout.x, Y: height - 160}
                // }
                setColorsOptionPosition(
                  (colorspositions)=> {
                    return {...colorspositions, [colorsData.references[index]]: {X: layout.x, Y: height - 160}}
                  }
                )
              }}>
                <GestureDetector gesture={pan}>
                  <Animated.View
                    style={[styles.colorCircle, {backgroundColor: color}, selectedColor == color ? animatedStyles : {}]}
                    ref = {colorsData.animationRef[index]}
                  />
                </GestureDetector>
              </View>
            );
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
    width: '100%',
  },
  colorContent: {
    width: 123,
    height: 123,
    borderWidth: 1,
    borderRadius: 123,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorCircle: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
});

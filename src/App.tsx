import React, { useState, useRef } from 'react';
import {
  Animated,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
  Easing,
} from 'react-native';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import DiceOne from '../assets/one.jpeg';
import DiceTwo from '../assets/two.jpeg';
import DiceThree from '../assets/three.jpeg';
import DiceFour from '../assets/four.jpeg';
import DiceFive from '../assets/five.jpeg';
import DiceSix from '../assets/six.jpeg';

function App(): React.JSX.Element {
  const [diceImage, setDiceImage] = useState<ImageSourcePropType>(DiceOne);
  const rotateAnim = useRef(new Animated.Value(0)).current; // Animation value

  const rollDiceOnTap = () => {
    let randomNumber = Math.floor(Math.random() * 6) + 1;

    // Simple Animation
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 500, // Rolling duration
      easing: Easing.linear, // Smooth animation
      useNativeDriver: true,
    }).start(() => {
      // Reset animation & change dice image after rolling
      rotateAnim.setValue(0);
      switch (randomNumber) {
        case 1: setDiceImage(DiceOne); break;
        case 2: setDiceImage(DiceTwo); break;
        case 3: setDiceImage(DiceThree); break;
        case 4: setDiceImage(DiceFour); break;
        case 5: setDiceImage(DiceFive); break;
        case 6: setDiceImage(DiceSix); break;
      }
    });
  };

  // Animated Rotation Style
  const animatedStyle = {
    transform: [
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'], // Single full spin
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.Image source={diceImage} style={[styles.diceImage, animatedStyle]} />
      <Pressable onPress={rollDiceOnTap} style={styles.button}>
        <Text style={styles.rollDiceBtnText}>Roll the Dice</Text>
      </Pressable>
    </View>
  );
}

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgb(37, 6, 6)',
  },
  diceImage: {
    width: 200,
    height: 200,
  },
  button: {
    marginTop: 20,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop:20,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: 'rgb(246, 237, 237)',
    fontSize: 26,
    color: 'rgb(227, 227, 227)',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});





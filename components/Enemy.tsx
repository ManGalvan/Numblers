import { useState, useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";
import ProgressBarLife from "./ProgressBarLife";

const ImgEnemy = require('@/assets/images/characters/c7.png');

export default function Enemy({ lifes }: { lifes: number }) {
  const [life, setLife] = useState(1);
  const [enemyImage, setEnemyImage] = useState('');
  const [typeEnemy, setTypeEnemy] = useState('');

  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: -10,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <ProgressBarLife progress={lifes / 10} />
      <Animated.Image
        source={ImgEnemy}
        style={[styles.enemy, { transform: [{ translateY: bounceAnim }] }]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  enemy: {
    width: 100,
    height: 150,
  },
});

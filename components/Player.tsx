import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import ProgressBarLife from "./ProgressBarLife";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Imágenes estáticas
const characterImages: { [key: string]: any } = {
  "c1.png": require('@/assets/images/characters/c1.png'),
  "c2.png": require('@/assets/images/characters/c2.png'),
  "c3.png": require('@/assets/images/characters/c3.png'),
  "c4.png": require('@/assets/images/characters/c4.png'),
  "c5.png": require('@/assets/images/characters/c5.png'),
  "c6.png": require('@/assets/images/characters/c6.png'),
  "c7.png": require('@/assets/images/characters/c7.png'),
  "c8.png": require('@/assets/images/characters/c8.png'),
  "c9.png": require('@/assets/images/characters/c9.png'),
  "c10.png": require('@/assets/images/characters/c10.png'),
};

export default function Player({ lifes }: { lifes: number }) {
  const [characterFile, setCharacterFile] = useState<string | null>(null);

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const savedCharacter = await AsyncStorage.getItem('character');
        if (savedCharacter && characterImages[savedCharacter]) {
          setCharacterFile(savedCharacter);
        } else {
          // Si no hay guardado, usar uno por defecto
          setCharacterFile('c1.png');
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadCharacter();
  }, []);

  return (
    <View style={styles.container}>
      <ProgressBarLife progress={lifes / 3} />
      {characterFile && (
        <Image
          contentFit="contain"
          style={styles.character}
          source={characterImages[characterFile]}
        />
      )}
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
  character: {
    width: 100,
    height: 150,
  },
});

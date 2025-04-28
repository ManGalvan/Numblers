import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import Logo from '@/components/Logo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated, {
  SlideInLeft,
  SlideOutRight,
  SlideInRight,
  SlideOutLeft,
} from 'react-native-reanimated';

// Lista de imágenes (requiere import estático)
const characterImages = [
  require('@/assets/images/characters/c1.png'),
  require('@/assets/images/characters/c2.png'),
  require('@/assets/images/characters/c3.png'),
  require('@/assets/images/characters/c4.png'),
  require('@/assets/images/characters/c5.png'),
  require('@/assets/images/characters/c6.png'),
  require('@/assets/images/characters/c7.png'),
  require('@/assets/images/characters/c8.png'),
  require('@/assets/images/characters/c9.png'),
  require('@/assets/images/characters/c10.png'),
];

export default function Characters() {
  const [characterIndex, setCharacterIndex] = useState(0);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const saved = await AsyncStorage.getItem('character');
        if (saved !== null) {
          const index = characterImages.findIndex((_, idx) => `c${idx + 1}.png` === saved);
          if (index !== -1) setCharacterIndex(index);
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadCharacter();
  }, []);

  useEffect(() => {
    const saveCharacter = async () => {
      try {
        const filename = `c${characterIndex + 1}.png`;
        await AsyncStorage.setItem('character', filename);
      } catch (e) {
        console.log(e);
      }
    };

    saveCharacter();
  }, [characterIndex]);

  const handlePrevious = () => {
    setSlideDirection('left');
    setCharacterIndex((prev) => (prev === 0 ? characterImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSlideDirection('right');
    setCharacterIndex((prev) => (prev === characterImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.characterContainer}>
        <Animated.View
          entering={slideDirection === 'right' ? SlideInRight.duration(300) : SlideInLeft.duration(300)}
          exiting={slideDirection === 'right' ? SlideOutLeft.duration(300) : SlideOutRight.duration(300)}
          key={characterIndex} // Muy importante para que se reinicie la animación
          style={styles.animatedView}
        >
          <Image
            source={characterImages[characterIndex]}
            style={styles.character}
            contentFit="contain"
          />
        </Animated.View>
      </View>
      <View style={styles.arrowsContainer}>
        <Ionicons name="caret-back-outline" size={100} color="#fff" onPress={handlePrevious} />
        <Ionicons name="caret-forward-outline" size={100} color="#fff" onPress={handleNext} />
      </View>
      <View style={styles.subcontaier}>
        <Pressable style={styles.button} onPress={() => router.navigate('/GameMode')}>
          <Text style={styles.textButton}>JUGAR</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.navigate('/Settings')}>
          <Text style={styles.textButton}>AJUSTES</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  subcontaier: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  characterContainer: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    overflow: 'hidden', // para evitar que se vea el slide por fuera
  },
  character: {
    width: 200,
    height: 300,
    resizeMode: 'contain',
  },
  button: {
    backgroundColor: '#FED300',
    padding: 15,
    borderRadius: 15,
    color: '#fff',
  },
  textButton: {
    color: 'brown',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  arrowsContainer: {
    flexDirection: 'row',
  },
  animatedView: { 
  }
});

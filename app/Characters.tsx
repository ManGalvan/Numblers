import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react'; // Importar useState para manejar el estado
import { router } from 'expo-router';
import Logo from '@/components/Logo';

// Lista de imágenes de personajes
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
  require('@/assets/images/characters/c10.png')
];

export default function Characters() {
  // Estado para controlar el índice del personaje
  const [characterIndex, setCharacterIndex] = useState(0); // Empezamos con el primer personaje (índice 0)

  // Funciones para manejar la navegación entre personajes
  const handlePrevious = () => {
    if (characterIndex > 0) {
      setCharacterIndex(characterIndex - 1);
    } else if(characterIndex === 0) {
      setCharacterIndex(characterIndex + 9);
    }
  };

  const handleNext = () => {
    if (characterIndex < characterImages.length - 1) { // Verificar que no se exceda el índice máximo
      setCharacterIndex(characterIndex + 1);
    } else if(characterIndex === 9) {
      setCharacterIndex(characterIndex - 9);
    }
  };

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.characterContainer}>
        <Image
          source={characterImages[characterIndex]} // Usamos el arreglo de imágenes y el índice actual
          style={styles.character}
        />
      </View>
      <View style={styles.arrowsContainer}>
        <Ionicons
          name="caret-back-outline"
          size={100}
          color={'#fff'}
          onPress={handlePrevious} // Función de "Anterior"
        />
        <Ionicons
          name="caret-forward-outline"
          size={100}
          color={'#fff'}
          onPress={handleNext} // Función de "Siguiente"
        />
      </View>
      <View style={styles.subcontaier}>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>PROGRESO</Text>
        </Pressable>
        <Pressable style={styles.button}>
          <Text style={styles.textButton}>PERSONAJES</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => router.navigate('/GameMode')}>
          <Text style={styles.textButton}>JUGAR</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#007AFF'
  },
  subcontaier: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  characterContainer: {
    flex: 1,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
  },
  character: {
    width: '100%',
    height: '100%',
    alignSelf: 'center',
    resizeMode: 'contain'
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
    display: 'flex',
    flexDirection: 'row'
  }
});

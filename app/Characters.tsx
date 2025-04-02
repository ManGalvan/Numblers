import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useRouter } from 'expo-router';
import Logo from '@/components/Logo';

const character = require('@/assets/images/characters/c1.png');

export default function Characters() {
  return (
    <View style={styles.container}>
      <Logo/>
      <View style={styles.characterContainer}>
        <Image
          source={character}
          style={styles.character}
        />
      </View>
      <View style={styles.arrowsContainer}>
        <Ionicons name='caret-back-outline' size={100} color={'#fff'} onPress={() => {alert('Anterior')}}/>
        <Ionicons name='caret-forward-outline' size={100} color={'#fff'} onPress={() => {alert('Siguiente')}}/>
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
    // backgroundColor: 'gray'
  },
  characterContainer: {
    flex: 1,
    top: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    // backgroundColor: 'red',
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

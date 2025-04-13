import { View, Text, StyleSheet, ImageBackground, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import ProgressBar from '@/components/ProgressBar';
import Player from '@/components/Player';
import Enemy from '@/components/Enemy';
import GameLogic from '@/components/GameLogic';
import AsyncStorage from '@react-native-async-storage/async-storage';

const bgImage = require('@/assets/images/bg.png');

export default function Game() {
  const [operationType, setOperationType] = useState<string | null>(null);
  const [lifesPlayer, setLifesPlayer] = useState(3);
  const [lifesEnemy, setLifesEnemy] = useState(3);
  const [totalQuestions, setTotalQuestions] = useState(3);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const progress = questionsAnswered / totalQuestions;

  useEffect(() => {
    const fetchOperationType = async () => {
      try {
        const value = await AsyncStorage.getItem('operationType');
        if (value !== null) {
          setOperationType(value);
        } else {
          Alert.alert('No se encontró el tipo de operación.');
        }
      } catch (e) {
        Alert.alert(`Error al leer: ${e}`);
      }
    };

    fetchOperationType();
  }, []);

  useEffect(() => {
    if (progress === 1) {
      Alert.alert('Juego terminado');
    }
  }, [progress]);

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} resizeMode='cover' style={styles.bgImage}>
        {
          !operationType ? (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Cargando...</Text>
            </View>
          ) : (
            <>
              <View style={styles.containerPBar}>
                <ProgressBar progress={progress} />
              </View>
              <View style={styles.charactersContainer}>
                <Player lifes={lifesPlayer} />
                <Enemy lifes={lifesEnemy} />
              </View>
            </>
          )
        }
      </ImageBackground>

      {
        operationType && (
          <View style={styles.questionsContainer}>
            <GameLogic
              operationType={operationType}
              totalQuestions={totalQuestions}
              questionsAnswered={questionsAnswered}
              setQuestionsAnswered={setQuestionsAnswered}
              setLifesPlayer={setLifesPlayer}
              setLifesEnemy={setLifesEnemy}
            />
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  loadingText: {
    color: '#fff',
    fontSize: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    alignItems: 'center',
  },
  containerPBar: {},
  charactersContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 250,
  },
  questionsContainer: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#fff',
  },
});

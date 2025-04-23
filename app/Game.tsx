import { View, Text, StyleSheet, ImageBackground, Alert, Modal, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import ProgressBar from '@/components/ProgressBar';
import Player from '@/components/Player';
import Enemy from '@/components/Enemy';
import GameLogic from '@/components/GameLogic';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const bgImage = require('@/assets/images/bg.png');

export default function Game() {
  const [operationType, setOperationType] = useState<string | null>(null);
  const [lifesPlayer, setLifesPlayer] = useState(3);
  const [lifesEnemy, setLifesEnemy] = useState(10);
  const [totalQuestions, setTotalQuestions] = useState(10);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

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
    if (progress >= 1) {
      setModalVisible(!modalVisible);
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

      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>El juego ha terminado! Has ganado 0 monedas</Text>
            <Pressable style={[styles.button, styles.buttonCloseModal]} onPress={() => {router.navigate('/Characters')}}>
              <Text style={styles.textButtonModal}>Salir</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
  centeredView:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 15,
    padding: 10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  },
  buttonCloseModal: {
    backgroundColor: '#007AFF',
    padding: 15
  },
  textButtonModal: {
    textAlign: 'center',
    color: '#fff'
  }
});

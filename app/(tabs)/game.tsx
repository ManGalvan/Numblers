import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, Button, Alert, Modal, Pressable } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MathProblem from '@/components/MathChallenge';
import * as Progress from 'react-native-progress';  // Para la barra de progreso

const image = require('@/assets/images/bg.png');

export default function Game() {
  const [score, setScore] = useState(0);  // Estado para llevar el puntaje
  const [totalQuestions, setTotalQuestions] = useState(0);  // Número total de preguntas
  const [questionsAnswered, setQuestionsAnswered] = useState(0);  // Número de preguntas respondidas
  const [userInput, setUserInput] = useState('');  // Estado para el input de cuántas preguntas responder
  const [modalVisible, setModalVisible] = useState(true)

  // Función para manejar respuesta correcta
  const handleCorrectAnswer = () => {
    setScore(score + 1);  // Aumentar el puntaje en 1
    setQuestionsAnswered(questionsAnswered + 1);  // Aumentar el contador de preguntas respondidas
  };

  // Función para manejar respuesta incorrecta
  const handleIncorrectAnswer = () => {
    setQuestionsAnswered(questionsAnswered + 1);  // Aumentar el contador de preguntas respondidas
  };

  // Función para manejar la cantidad de preguntas
  const startGame = () => {
    if (isNaN(parseInt(userInput)) || parseInt(userInput) <= 0) {
      Alert.alert('Error', 'Por favor, ingresa un número válido de preguntas');
      setModalVisible(modalVisible)
      return;
    }
    setTotalQuestions(parseInt(userInput));  // Establecer el número total de preguntas
    setQuestionsAnswered(0);  // Resetear las preguntas respondidas
    setScore(0);  // Resetear el puntaje
  };

  const checkTotalQuestions = () => {
    if(totalQuestions != 0){
      Alert.alert('Juego terminado!', `Has ganado ${score} monedas`);
    }
  }

  // Función para reiniciar el juego
  const resetGame = () => {
    setTotalQuestions(0);
    setQuestionsAnswered(0);
    setScore(0);
    setUserInput('');
    setModalVisible(!modalVisible)
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <ImageBackground source={image} resizeMode="cover" style={styles.image}>
          <View style={styles.content}>
            {/* Si el juego no ha comenzado, se muestra el input para preguntar cuántas preguntas */}
            {totalQuestions === 0 ? (
              <>
              </>
            ) : (
              <>
                {/* Muestra la barra de progreso */}
                <Progress.Bar 
                  progress={questionsAnswered / totalQuestions} 
                  width={300} 
                  height={20}
                  color="#AFFA37"
                  unfilledColor="#fff"
                  borderWidth={0}
                  style={styles.progressBar}
                />
                <Text style={styles.title}>Puntaje: {score}</Text>
              </>
            )}
          </View>
          <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
                  setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                    <Text style={styles.title}>¿Cuántas preguntas quieres responder?</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={userInput}
                      onChangeText={setUserInput}
                      placeholder="Ingresa un número"
                    />
                    <Pressable
                      style={[styles.button]}
                      onPress={() => {
                        setModalVisible(!modalVisible)
                        startGame()
                      }}>
                      <Text style={styles.textStyle}>Comenzar</Text>
                    </Pressable>
                  </View>
                </View>
              </Modal>
        </ImageBackground>
        <>
          {/* Aquí importa el componente MathProblem */}
          {questionsAnswered < totalQuestions ? (
            <MathProblem
              onAnswerCorrect={handleCorrectAnswer} 
              onAnswerIncorrect={handleIncorrectAnswer}
            />
          ) : (
            checkTotalQuestions()
          )}
        </>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  content: {
    width: '80%',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    color: 'black',
    alignSelf: 'center',
    borderRadius: 15,
    backgroundColor: 'white'
  },
  progressBar: {
    marginBottom: 20,
    marginTop: 20
  },
  result: {
    fontSize: 18,
    color: 'yellow',
    marginTop: 10,
  },
  bg: {
    width: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 15,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 15,
    padding: 10,
    elevation: 2,
    backgroundColor: '#FED300'
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

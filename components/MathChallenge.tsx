import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function MathProblem({ onAnswerCorrect, onAnswerIncorrect }) {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 100));
  const [num2, setNum2] = useState(Math.floor(Math.random() * 100));
  const [userAnswer, setUserAnswer] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  // Función para verificar la respuesta
  const checkAnswer = () => {
    const correctAnswer = num1 + num2;
    if (parseInt(userAnswer) === correctAnswer) {
      onAnswerCorrect();
    } else {
      onAnswerIncorrect();
    }
    setIsAnswered(true);
  };

  // Resetear la pregunta cuando la respuesta se haya verificado
  useEffect(() => {
    if (isAnswered) {
      setTimeout(() => {
        setNum1(Math.floor(Math.random() * 100));  // Nueva pregunta
        setNum2(Math.floor(Math.random() * 100));  // Nueva pregunta
        setUserAnswer('');  // Limpiar la respuesta
        setIsAnswered(false);  // Reiniciar la flag de respuesta
      }, 1000);  // Esperar 1 segundo antes de generar una nueva pregunta
      if(parseInt(userAnswer) === num1 + num2){
        Alert.alert('Correcto!', 'Excelente, sigue así');
      } else {
        Alert.alert('Incorrecto!', 'Más suerte para la próxima');
      }
    }
  }, [isAnswered]);

  return (
    <View style={styles.container}>
      <Text style={styles.problem}>{num1} + {num2} = ?</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={userAnswer}
        onChangeText={setUserAnswer}
        placeholder="Tu respuesta"
      />

      <Button title="Comprobar respuesta" onPress={checkAnswer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#793A03',
    paddingBottom: 20
  },
  problem: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    // borderColor: 'white',
    // borderWidth: 1,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingLeft: 10,
    color: '#000',
  },
  result: {
    fontSize: 18,
    color: 'yellow',
    marginTop: 10,
  },
});

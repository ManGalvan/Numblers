import { View, Text, StyleSheet } from 'react-native';
import { useState } from 'react';

export default function Game() {
  const [lifes, setLifes] = useState(3);
  const [num1, setNum1] = useState(Math.floor(Math.random() * 100));
  const [num2, setNum2] = useState(Math.floor(Math.random() * 100));
  const [userAnswer, setUserAnswer] = useState('');
  const [problemType, setProblemType] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  switch(problemType){
    case 'suma':
    break;

    case 'resta':
    break;

    case 'multiplicacion':
    break;

    case 'division':
    break;
  }

  return (
    <View style={styles.container}>
      <Text>¡Pantalla de Juego!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

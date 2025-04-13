import { useState, useEffect, useRef } from "react";
import {
  Alert,
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  Keyboard,
} from "react-native";

interface GameLogicProps {
  operationType: string;
  totalQuestions: number;
  questionsAnswered: number;
  setQuestionsAnswered: React.Dispatch<React.SetStateAction<number>>;
  setLifesPlayer: React.Dispatch<React.SetStateAction<number>>;
  setLifesEnemy: React.Dispatch<React.SetStateAction<number>>;
}

export default function GameLogic({
  operationType,
  totalQuestions,
  questionsAnswered,
  setQuestionsAnswered,
  setLifesPlayer,
  setLifesEnemy,
}: GameLogicProps) {
  const [num1, setNum1] = useState(Math.floor(Math.random() * 100));
  const [num2, setNum2] = useState(Math.floor(Math.random() * 100));
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);

  // Referencia al TextInput para ocultar el teclado
  const inputRef = useRef<TextInput>(null);

  const newRandoms = () => {
    setNum1(Math.floor(Math.random() * 100));
    setNum2(Math.floor(Math.random() * 100));
  };

  const handleCorrectAnswer = () => {
    setScore(score + 1);
    setQuestionsAnswered((prev) => prev + 1);
    setLifesEnemy((prev) => prev - 1); // Restar vida al enemigo
    Alert.alert('¡Respuesta Correcta!', '¡Excelente, sigue así!');
  };

  const handleIncorrectAnswer = () => {
    setQuestionsAnswered((prev) => prev + 1);
    setLifesPlayer((prev) => prev - 1); // Restar vida al jugador
    Alert.alert('¡Respuesta Incorrecta!', 'Más suerte para la próxima');
  };

  const generateQuestion = (operationType: string) => {
    switch (operationType) {
      case 'suma':
        return `${num1} + ${num2} = ?`;
      case 'resta':
        return `${num1} - ${num2} = ?`;
      case 'multiplicacion':
        return `${num1} * ${num2} = ?`;
      case 'division':
        return `${num1} / ${num2} = ?`;
      default:
        Alert.alert('Error', 'Operación no reconocida');
        return '';
    }
  };

  const checkAnswer = (operationType: string) => {
    let result = 0;

    switch (operationType) {
      case 'suma':
        result = num1 + num2;
        break;
      case 'resta':
        result = num1 - num2;
        break;
      case 'multiplicacion':
        result = num1 * num2;
        break;
      case 'division':
        result = Math.floor(num1 / num2);
        break;
    }

    setCorrectAnswer(result);

    if (parseInt(userAnswer) === result) {
      handleCorrectAnswer();
    } else {
      handleIncorrectAnswer();
    }

    setIsAnswered(true);
  };

  useEffect(() => {
    if (isAnswered) {
      setTimeout(() => {
        newRandoms();
        setUserAnswer('');
        setIsAnswered(false);
      }, 1000);
    }
  }, [isAnswered]);

  return (
    <View style={styles.container}>
      <Text style={styles.problem}>{generateQuestion(operationType)}</Text>
      <TextInput
        ref={inputRef}
        style={styles.input}
        keyboardType="numeric"
        value={userAnswer}
        onChangeText={setUserAnswer}
        placeholder="Tu respuesta"
      />
      <Pressable
        style={styles.btn}
        onPress={() => {
          inputRef.current?.blur(); // Ocultar teclado
          checkAnswer(operationType);
        }}
      >
        <Text style={styles.txtBtn}>Comprobar respuesta</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#793A03',
    paddingBottom: 20,
  },
  problem: {
    fontSize: 24,
    marginBottom: 10,
    color: 'white',
  },
  input: {
    width: '80%',
    height: 40,
    backgroundColor: '#fff',
    marginBottom: 20,
    paddingLeft: 10,
    color: '#000',
  },
  btn: {
    backgroundColor: '#FED300',
    borderRadius: 15,
    padding: 10,
  },
  txtBtn: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 30,
  },
});

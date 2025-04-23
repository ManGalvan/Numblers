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
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [grade, setGrade] = useState("1ero de Primaria");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const getGrade = async () => {
      const storedGrade = await AsyncStorage.getItem("grade");
      if (storedGrade) setGrade(storedGrade);
    };
    getGrade();
  }, []);

  const generateRandomNumbers = () => {
    let min = 1, max = 9;
    if (grade === "4to de Primaria" || grade === "5to de Primaria" || grade === "6to de Primaria") {
      min = 10; // 2 dígitos
      max = 99;
    }

    let a = Math.floor(Math.random() * (max - min + 1)) + min;
    let b = Math.floor(Math.random() * (max - min + 1)) + min;

    // Asegurar que la resta sea positiva
    if (operationType === "resta" && b > a) [a, b] = [b, a];

    // Asegurar que la división sea exacta
    if (operationType === "division") {
      a = a - (a % b); // Asegura que a sea divisible entre b
    }

    setNum1(a);
    setNum2(b);
  };

  const handleCorrectAnswer = () => {
    setScore(score + 1);
    setQuestionsAnswered((prev) => prev + 1);
    setLifesEnemy((prev) => prev - 1);
    // Alert.alert("¡Respuesta Correcta!", "¡Excelente, sigue así!");
  };

  const handleIncorrectAnswer = () => {
    setQuestionsAnswered((prev) => prev + 1);
    setLifesPlayer((prev) => prev - 1);
    // Alert.alert("¡Respuesta Incorrecta!", "Más suerte para la próxima");
  };

  const generateQuestion = (operationType: string) => {
    switch (operationType) {
      case "suma":
        return `${num1} + ${num2} = ?`;
      case "resta":
        return `${num1} - ${num2} = ?`;
      case "multiplicacion":
        return `${num1} * ${num2} = ?`;
      case "division":
        return `${num1} / ${num2} = ?`;
      default:
        return "Operación no reconocida";
    }
  };

  const checkAnswer = (operationType: string) => {
    let result = 0;
    switch (operationType) {
      case "suma":
        result = num1 + num2;
        break;
      case "resta":
        result = num1 - num2;
        break;
      case "multiplicacion":
        result = num1 * num2;
        break;
      case "division":
        result = num1 / num2;
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
    generateRandomNumbers();
  }, [operationType, grade]);

  useEffect(() => {
    if (isAnswered) {
      setTimeout(() => {
        generateRandomNumbers();
        setUserAnswer("");
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
          inputRef.current?.blur();
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
    alignItems: "center",
    backgroundColor: "#793A03",
    paddingBottom: 20,
  },
  problem: {
    fontSize: 24,
    marginBottom: 10,
    color: "white",
  },
  input: {
    width: "80%",
    height: 40,
    backgroundColor: "#fff",
    marginBottom: 20,
    paddingLeft: 10,
    color: "#000",
  },
  btn: {
    backgroundColor: "#FED300",
    borderRadius: 15,
    padding: 10,
  },
  txtBtn: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,
  },
});

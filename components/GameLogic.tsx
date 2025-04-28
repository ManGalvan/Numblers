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
  isGameStarted: boolean;
  lifesPlayer: number; // 🔥 Necesitamos saber las vidas actuales
  onGameOver: () => void; // 🔥 Función que avisa que el juego terminó
}

export default function GameLogic({
  operationType,
  totalQuestions,
  questionsAnswered,
  setQuestionsAnswered,
  setLifesPlayer,
  setLifesEnemy,
  isGameStarted,
  lifesPlayer,
  onGameOver,
}: GameLogicProps) {
  const [grade, setGrade] = useState("1ero de Primaria");
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const inputRef = useRef<TextInput>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null); // 🔥 Nuevo para manejar el intervalo

  // Leer grado
  useEffect(() => {
    const getGrade = async () => {
      const storedGrade = await AsyncStorage.getItem("grade");
      if (storedGrade) setGrade(storedGrade);
    };
    getGrade();
  }, []);

  // Timer inicia cuando empieza el juego
  useEffect(() => {
    if (!isGameStarted) return;

    setTimeLeft(10);
    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          handleIncorrectAnswer();
          setIsAnswered(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGameStarted, questionsAnswered]);

  // Terminar el juego si las vidas llegan a 0
  useEffect(() => {
    if (lifesPlayer <= 0) {
      if (timerRef.current) clearInterval(timerRef.current);
      onGameOver();
    }
  }, [lifesPlayer, onGameOver]);

  const generateRandomNumbers = () => {
    let min = 1, max = 9;
    if (["4to de Primaria", "5to de Primaria", "6to de Primaria"].includes(grade)) {
      min = 10;
      max = 99;
    }

    let a = Math.floor(Math.random() * (max - min + 1)) + min;
    let b = Math.floor(Math.random() * (max - min + 1)) + min;

    if (operationType === "resta" && b > a) [a, b] = [b, a];
    if (operationType === "division") {
      while (b === 0 || a % b !== 0) {
        a = Math.floor(Math.random() * (max - min + 1)) + min;
        b = Math.floor(Math.random() * (max - min + 1)) + min;
      }
    }

    setNum1(a);
    setNum2(b);
  };

  const handleCorrectAnswer = () => {
    setScore((prev) => prev + 1);
    setQuestionsAnswered((prev) => prev + 1);
    setLifesEnemy((prev) => prev - 1);
  };

  const handleIncorrectAnswer = () => {
    setQuestionsAnswered((prev) => prev + 1);
    setLifesPlayer((prev) => prev - 1);
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
        setTimeLeft(10);
      }, 1000);
    }
  }, [isAnswered]);

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>⏳ Tiempo: {timeLeft}s</Text>

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
  timerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FED300",
    marginBottom: 10,
  },
  problem: {
    fontSize: 28,
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

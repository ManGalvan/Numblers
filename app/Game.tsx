import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import { useState } from 'react';
import * as Progress from 'react-native-progress';

import ProgressBar from '@/components/ProgressBar';
import Player from '@/components/Player';
import Enemy from '@/components/Enemy';
import GameLogic from '@/components/GameLogic';

const bgImage = require('@/assets/images/bg.png');

export default function Game() {
  const [lifes, setLifes] = useState(3);
  const [num1, setNum1] = useState(Math.floor(Math.random() * 100));
  const [num2, setNum2] = useState(Math.floor(Math.random() * 100));
  const [userAnswer, setUserAnswer] = useState('');
  const [problemType, setProblemType] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);

  const [totalQuestions, setTotalQuestions] = useState(3); // o el número que quieras
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const progress = questionsAnswered / totalQuestions;  //Calculando el progreso

  return (
    <View style={styles.container}>
      <ImageBackground source={bgImage} resizeMode='cover' style={styles.bgImage}>
        <View style={styles.containerPBar}>
          <ProgressBar progress={progress}/>
        </View>
        <View style={styles.charactersContainer}>
          <Player/>
          <Enemy/>
        </View>
      </ImageBackground>
      <View style={styles.questionsContainer}>
          <GameLogic
            operationType={'suma'}
            totalQuestions={totalQuestions}
            questionsAnswered={questionsAnswered}
            setQuestionsAnswered={setQuestionsAnswered}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    flex: 1,
    alignItems: 'center',
  },
  containerPBar: {

  },
  charactersContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 200,
  },
  progressBar: {
    marginBottom: 20,
    marginTop: 20
  },
  questionsContainer: {
    display:'flex',
    width: '100%',
    backgroundColor: '#fff'
  }
});

import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import Logo from "@/components/Logo";
import { router } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';

export default function GameMode() {
  let [operationType, setOperationType] = useState('');
  const [grade, setGrade] = useState('1ro de Primaria');

  const saveOperationType = async (typeOperation: string) => {
    try {
      await AsyncStorage.setItem('operationType', typeOperation);
      router.navigate('/Game');
    } catch (e) {
      Alert.alert(`Error: ${e}`);
    }
  };

  const getGrade = async () => {
    try {
      const value = await AsyncStorage.getItem('grade');
      if (value !== null) {
        setGrade(value);
      }
    } catch (e) {
      console.log(`Error: ${e}`);
    }
  };

  useEffect(() => {
    getGrade();
  }, [grade]);

  // Determinar qué operaciones mostrar según el grado
  const renderOperationButtons = () => {
    switch (grade) {
      case '1ero de Primaria':
        // Solo Suma y Resta para 1ro de Primaria
        return (
          <>
            <Pressable style={styles.button} onPress={() => setOperationType('suma')}>
              <Text style={styles.textButton}>SUMA</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('resta')}>
              <Text style={styles.textButton}>RESTA</Text>
            </Pressable>
          </>
        );
      case '2do de Primaria':
        // Suma, Resta y Multiplicación para 2do de Primaria
        return (
          <>
            <Pressable style={styles.button} onPress={() => setOperationType('suma')}>
              <Text style={styles.textButton}>SUMA</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('resta')}>
              <Text style={styles.textButton}>RESTA</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('multiplicacion')}>
              <Text style={styles.textButton}>MULTIPLICACION</Text>
            </Pressable>
          </>
        );
      case '3ro de Primaria':
        // Suma, Resta, Multiplicación y División para 3ro de Primaria
        return (
          <>
            <Pressable style={styles.button} onPress={() => setOperationType('suma')}>
              <Text style={styles.textButton}>SUMA</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('resta')}>
              <Text style={styles.textButton}>RESTA</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('multiplicacion')}>
              <Text style={styles.textButton}>MULTIPLICACION</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('division')}>
              <Text style={styles.textButton}>DIVISION</Text>
            </Pressable>
          </>
        );
      case '4to de Primaria':
        // Suma, Resta, Multiplicación y División para 3ro de Primaria
        return (
          <>
            <Pressable style={styles.button} onPress={() => setOperationType('suma')}>
              <Text style={styles.textButton}>SUMA</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('resta')}>
              <Text style={styles.textButton}>RESTA</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('multiplicacion')}>
              <Text style={styles.textButton}>MULTIPLICACION</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('division')}>
              <Text style={styles.textButton}>DIVISION</Text>
            </Pressable>
          </>
        );
      case '5to de Primaria':
        // Suma, Resta, Multiplicación y División para 3ro de Primaria
        return (
          <>
            <Pressable style={styles.button} onPress={() => setOperationType('suma')}>
              <Text style={styles.textButton}>SUMA</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('resta')}>
              <Text style={styles.textButton}>RESTA</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('multiplicacion')}>
              <Text style={styles.textButton}>MULTIPLICACION</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('division')}>
              <Text style={styles.textButton}>DIVISION</Text>
            </Pressable>
          </>
        );
      case '6to de Primaria':
        // Suma, Resta, Multiplicación y División para 3ro de Primaria
        return (
          <>
            <Pressable style={styles.button} onPress={() => setOperationType('suma')}>
              <Text style={styles.textButton}>SUMA</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('resta')}>
              <Text style={styles.textButton}>RESTA</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('multiplicacion')}>
              <Text style={styles.textButton}>MULTIPLICACION</Text>
            </Pressable>
            <Pressable style={styles.button} onPress={() => setOperationType('division')}>
              <Text style={styles.textButton}>DIVISION</Text>
            </Pressable>
          </>
        );
    }
  };

  useEffect(() => {
    if (operationType !== '') {
      saveOperationType(operationType);
    }
  }, [operationType]);

  return (
    <View style={styles.container}>
      <Logo />
      <View style={styles.headerContainer}>
        <Text style={styles.header}>SELECCIONA UN MODO DE JUEGO</Text>
      </View>
      <View style={styles.subcontainer}>
        {renderOperationButtons()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#007AFF',
  },
  subcontainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  headerContainer: {},
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
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
});

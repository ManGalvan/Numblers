import { View, Text, StyleSheet, Pressable, Alert} from 'react-native';
import Logo from "@/components/Logo";
import {router, useRouter} from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from 'react';

export default function GameMode() {

let [operationType, setOperationType] = useState('');

const saveOperationType = async (typeOperation:string) => {
  try {
    await AsyncStorage.setItem('operationType', typeOperation);
    router.navigate('/Game')
  } catch (e) {
    Alert.alert(`Error: ${e}`);
  }
}

useEffect(() => {
  if(operationType !== '')
  saveOperationType(operationType);
}, [operationType]);


    return (
        <View style={styles.container}>
            <Logo/>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>SELECCIONA UN MODO DE JUEGO</Text>
            </View>
            <View style={styles.subcontaier}>
                <Pressable style={styles.button} onPress={() => {
                  setOperationType('suma')
                  }}>
                    <Text style={styles.textButton}>SUMA</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => {
                  setOperationType('resta')
                }}>
                    <Text style={styles.textButton}>RESTA</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => {
                  setOperationType('multiplicacion')
                }}>
                    <Text style={styles.textButton}>MULTIPLICACION</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => {
                  setOperationType('division')
                }}>
                    <Text style={styles.textButton}>DIVISION</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#007AFF'
  },
  subcontaier: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
    // backgroundColor: 'gray'
  },
  headerContainer: {
    // backgroundColor: '#000'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff'
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
  arrowsContainer: {
    display: 'flex',
    flexDirection: 'row'
  }
})
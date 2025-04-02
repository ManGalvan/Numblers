import React, { useState } from 'react';
import { ImageBackground, StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
// import MathProblem from '@/components/MathChallenge';
import * as Progress from 'react-native-progress';  // Para la barra de progreso

export default function Learn() {
    const [readed, setReaded] = useState(false) //Estado que funciona como bandera para validar si el usuario ya aprendio el tema

    return (
        <SafeAreaProvider style={styles.bgcolor}>
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>¿Estás listo para aprender?</Text>
                    <View style={styles.subContainer}>
                        <Button title='Suma' color='#FED300'/>
                        <Button title='Resta' color='#FED300'/>
                        <Button title='Multiplicacion' color='#FED300'/>
                        <Button title='Division' color='#FED300'/>
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    subContainer: {
        gap: 20
    },
    bgcolor: {
        backgroundColor: '#007AFF'
    },
    image: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    content: {
      width: '100%',
      alignItems: 'center',
      padding: 20,
    },
    title: {
      fontSize: 24,
      color: 'white',
      marginBottom: 20,
      fontWeight: 'bold',
    },
    input: {
      width: '80%',
      height: 40,
      borderColor: 'white',
      borderWidth: 1,
      marginBottom: 20,
      paddingLeft: 10,
      color: 'white',
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
    btn: {
        paddingTop: 20
    }
  });

import { Text, View, StyleSheet, Pressable, TextInput, Alert } from "react-native";
import { useRouter } from "expo-router";
import Logo from "@/components/Logo";
import { useState } from "react";

import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Grade() {
  const router = useRouter();
  let [selectedGrade, setSelectedGrade] = useState("1ero de Primaria");

  const saveGrade = async () => {
    try {
        await AsyncStorage.setItem('grade', selectedGrade);
        router.navigate('/Characters');
    } catch (e) {
        Alert.alert(`Error: ${e}`)
    }
  }

  return (
    <View style={styles.container}>
      <Logo/>
        <View style={styles.subcontaier}>
            <Text style={styles.titleText}>¿En qué grado estás?</Text>
            <View>
                <Picker
                    selectedValue={selectedGrade}
                    style={styles.picker}
                    onValueChange={(itemname) => {
                        setSelectedGrade(itemname)
                    }}>
                    <Picker.Item label="1ero de Primaria"/>
                    <Picker.Item label="2do de Primaria"/>
                    <Picker.Item label="3ro de Primaria"/>
                    <Picker.Item label="4to de Primaria"/>
                    <Picker.Item label="5to de Primaria"/>
                    <Picker.Item label="6to de Primaria"/>
                </Picker>
              <Pressable style={styles.btnContinuar} onPress={() => saveGrade()}>
                <Text style={styles.txtContinuar}>Continuar</Text>
              </Pressable>
            </View>
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
    justifyContent: 'flex-start',
    gap: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FED300',
    padding: 15,
    borderRadius: 15,
    color: '#fff'
  },
  textButton: {
    color: 'brown',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  titleText: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold'
  },
  txtAge: {
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  btnContinuar: {
    padding: 10,
    backgroundColor: '#FED300',
    borderRadius: 15,
    marginTop: 40,
  },
  txtContinuar: {
    textAlign: 'center',
    color: 'brown',
    fontWeight: 'bold',
    fontSize: 20
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 15
  }

});

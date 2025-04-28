import Logo from "@/components/Logo";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router} from "expo-router";

export default function Settings() {
    const grades = [
        "1ero de Primaria",
        "2do de Primaria",
        "3ro de Primaria",
        "4to de Primaria",
        "5to de Primaria",
        "6to de Primaria"
    ];

    const [selectedGrade, setSelectedGrade] = useState(grades[0]); // Valor seguro

    useEffect(() => {
        const getGrade = async () => {
            try {
                const grade = await AsyncStorage.getItem('grade');
                console.log("Desde AsyncStorage:", grade);
                if (grade && grades.includes(grade)) { // Validar que esté en las opciones
                    setSelectedGrade(grade);
                }
            } catch (e) {
                console.log(`Error: ${e}`);
            }
        };
    
        getGrade();
    }, []);

    const saveGrade = async () => {
        try {
            await AsyncStorage.setItem('grade', selectedGrade);
            console.log(`Guardado: ${selectedGrade}`);
        } catch (e) {
            console.log(`Error: ${e}`);
        }
    }

    const exit = async () => {  //Funcion que retorna al inicio y elimina todas las variables almacenadas localmente
        try {
            Alert.alert('Cerrando sesión...', '¿Realmente quieres cerrar tu sesión? \n\nTu progreso se va a perder si no estás registrado', [
                {
                    text: 'Cancelar',
                    onPress: () => {
                        console.log('Se cancelo la operacion');
                    },
                    style: 'cancel'
                },
                {
                    text: 'Aceptar',
                    onPress: async () => {
                        let keys = await AsyncStorage.getAllKeys();
                        await AsyncStorage.multiRemove(keys);
                        router.navigate('/SignIn');
                    }
                }
            ]);
        } catch(e) {
          console.log(`Error: ${e}`);
        }
      }

    return (
        <View style={styles.container}>
            <Logo />
                <Text style={styles.header}>AJUSTES</Text>
                <View style={styles.subcontainer}>
                    <Text style={styles.titleText}>¿Quieres cambiar de grado?</Text>
                    <Picker
                        selectedValue={selectedGrade}
                        style={styles.picker}
                        onValueChange={(item) => {
                            setSelectedGrade(item);
                        }}
                    >
                        {grades.map((grade) => (
                            <Picker.Item label={grade} value={grade} key={grade} />
                        ))}
                    </Picker>
                    <Pressable style={styles.btnGuardar} onPress={saveGrade}>
                        <Text style={styles.txtBtnGuardar}>Guardar</Text>
                    </Pressable>
                    <Pressable style={styles.btnExit} onPress={exit}>
                        <Text style={styles.txtBtnExit}>Cerrar sesión</Text>
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
    subcontainer: {
        flex: 1,
        justifyContent: 'center',
        gap: 20,
    },
    header: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#fff',
    },
    picker: {
        backgroundColor: '#fff',
        borderRadius: 15
    },
    btnGuardar: {
        padding: 10,
        backgroundColor: '#FED300',
        borderRadius: 15,
    },
    btnExit:{
        padding: 10,
        backgroundColor: '#E4080A',
        borderRadius: 15,
        marginTop: 100
    },
    txtBtnGuardar: {
        textAlign: 'center',
        color: 'brown',
        fontWeight: 'bold',
        fontSize: 20
    },
    txtBtnExit: {
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
    },
    titleText: {
    fontSize: 20,
    color: '#fff',
    }
});

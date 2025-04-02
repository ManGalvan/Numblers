import { View, Text, StyleSheet, Pressable} from 'react-native';
import Logo from "@/components/Logo";
import {router, useRouter} from 'expo-router';

export default function GameMode() {
    return (
        <View style={styles.container}>
            <Logo/>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>SELECCIONA UN MODO DE JUEGO</Text>
            </View>
            <View style={styles.subcontaier}>
                <Pressable style={styles.button}>
                    <Text style={styles.textButton}>SUMA</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.textButton}>RESTA</Text>
                </Pressable>
                <Pressable style={styles.button}>
                    <Text style={styles.textButton}>MULTIPLICACION</Text>
                </Pressable>
                <Pressable style={styles.button}>
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
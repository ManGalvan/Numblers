import { Text, View, StyleSheet, Pressable } from "react-native";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import Logo from "@/components/Logo";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignIn() {
  const router = useRouter();

  const getGrade = async () => {
    try {
      const value = await AsyncStorage.getItem('grade');
      if(value !== null) {
        router.navigate('/Characters');
      } else {
        router.navigate('/Grade');
      }
    } catch(e) {
      console.log(e);
    }
  }
  
  return (
    <View style={styles.container}>
      <Logo/>
      <View style={styles.subcontaier}>
        <Pressable style={styles.button} onPress={() => alert('Press button')}>
          <Text style={styles.textButton}>Iniciar sesion</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={() => getGrade()}>
          <Text style={styles.textButton}>Ingresar como invitado</Text>
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
    justifyContent: 'flex-end',
    gap: 20,
    marginBottom: 20
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
    fontWeight: 'bold',
    fontSize: 20
  }
});

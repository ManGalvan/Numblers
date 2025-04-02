import { Text, View, StyleSheet, Pressable, TextInput } from "react-native";
import { Image } from 'expo-image';
import { useRouter } from "expo-router";
import Logo from "@/components/Logo";

export default function Age() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Logo/>
        <View style={styles.subcontaier}>
            <Text style={styles.titleText}>¿Cual es tu edad?</Text>
            <View>
              <TextInput
                style={styles.txtAge}
                placeholder="Ingresa tu edad"
                keyboardType="number-pad"
              />
              <Pressable style={styles.btnContinuar} onPress={() => {router.navigate('../Characters')}}>
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
  }
});

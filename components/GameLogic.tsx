import { useState, useEffect } from "react"
import { Alert, StyleSheet, View, Text, TextInput, Pressable } from "react-native";

interface GameLogicProps {
    operationType: string;
    totalQuestions: number;
    questionsAnswered: number;
}

export default function GameLogic({
    operationType, 
    totalQuestions, 
    questionsAnswered, 
    setQuestionsAnswered
}: {
    operationType:string;
    totalQuestions:number; 
    questionsAnswered:number; 
    setQuestionsAnswered:React.Dispatch<React.SetStateAction<number>>;

}){ //Recibe el tipo de operacion como parametro
//********** CONSTANTES Y ESTADOS **********/
    //Estado que almacena un primer numero aleatorio
    const [num1, setNum1] = useState(Math.floor(Math.random() * 100));

    //Estado que almacena un segundo numero aleatorio
    const [num2, setNum2] = useState(Math.floor(Math.random() * 100));

    //Estado para llevar el puntaje del usuario
    const [score, setScore] = useState(0);

    //Estado que almacena la respuesta del usuario
    const [userAnswer, setUserAnswer] = useState('');

    //Estado que almacena la respuesta correcta de la operacion
    const [correctAnswer, setCorrectAnswer] = useState(0);

    //Estado que almacena si una pregunta ya fue respondida
    const [isAnswered, setIsAnswered] = useState(false);



    //********** FUNCIONES Y EFECTOS **********/
    //Funcion para generar nuevos numeros aleatorios
    const newRandoms = () => {
        setNum1(Math.floor(Math.random() * 100));
        setNum2(Math.floor(Math.random() * 100));
    }

    //Funcion para manejar respuestas correctas
    const handleCorrectAnswer = () => {
        setScore(score + 1);
        setQuestionsAnswered(questionsAnswered + 1);
        Alert.alert('Respuesta Correcta!', 'Excelente, sigue así');
    }

    //Funcion para manejar respuestas incorrectas
    const handleIncorrectAnswer = () => {
        setQuestionsAnswered(questionsAnswered + 1);
        Alert.alert('Respuesta Incorrecta!', 'Mas suerte para la proxima');
    }

    //Funcion para generar una nueva pregunta aleatoria
    const generateQuestion = (operationType:any) => {
        if(operationType === 'suma'){
            return `${num1} + ${num2} = ?`;
        }else if(operationType === 'resta'){
            return `${num1} - ${num2} = ?`;
        } else if(operationType === 'multiplicacion'){
            return `${num1} * ${num2} = ?`;
        } else if(operationType === 'division'){
            return `${num1} / ${num2} = ?`;
        } else {
            Alert.alert('Error', 'Ocurrió un error inesperado!');
        }
    }

    const checkAnswer = (operationType: any) => {
        let result = 0;
    
        if (operationType === 'suma') {
            result = num1 + num2;
        } else if (operationType === 'resta') {
            result = num1 - num2;
        } else if (operationType === 'multiplicacion') {
            result = num1 * num2;
        } else if (operationType === 'division') {
            result = num1 / num2;
        }
    
        // Guardamos la respuesta correcta si quieres mostrarla luego
        setCorrectAnswer(result);
    
        // Comparamos usando el resultado calculado directamente
        if (parseInt(userAnswer) === result) {
            handleCorrectAnswer();
        } else {
            handleIncorrectAnswer();
        }
    
        setIsAnswered(true);
    };

    //Vuelve a renderizar todo cuando la respuesta ingresada por el usuario se ha verificado
    useEffect(() => {
        if(isAnswered){
            setTimeout(() => {
                newRandoms();   //Se generan nuevos numeros aleatorios
                setUserAnswer('');  //Limpia el campo de la respuesta del usuario
                setIsAnswered(false);   //Reiniciar la bandera de la respuesta
            }, 1000);   //Esperar un segundo antes de generar una nueva pregunta
        }
    }, [isAnswered]);


    //********** VISTA (MAIN) **********/
    return (
        <View style={styles.container}>
            <Text style={styles.problem}>{generateQuestion(operationType)}</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={userAnswer}
                onChangeText={setUserAnswer}
                placeholder="Tu respuesta"
            />
            <Pressable style={styles.btn} onPress={() => {checkAnswer(operationType)}}>
                <Text style={styles.txtBtn}>Comprobar respuesta</Text>
            </Pressable>
        </View>
    );  

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#793A03',
        paddingBottom: 20
    },
    problem: {
        fontSize: 24,
        marginBottom: 10,
        color: 'white',
    },
    input: {
        width: '80%',
        height: 40,
        backgroundColor: '#fff',
        marginBottom: 20,
        paddingLeft: 10,
        color: '#000',
    },
    btn: {
        backgroundColor: '#FED300',
        borderRadius: 15,
        padding: 10,
    }, 
    txtBtn: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 30
    }
});
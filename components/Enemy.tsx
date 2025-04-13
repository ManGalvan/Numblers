import { useState } from "react";
import { View, StyleSheet, Text} from "react-native";
import { Image } from "expo-image";
import ProgressBarLife from "./ProgressBarLife";

const ImgEnemy = require('@/assets/images/characters/c7.png');

export default function Enemy({lifes}:{lifes:number}){
    const [life, setLife] = useState(1);
    const [enemyImage, setEnemyImage] = useState('');
    const [typeEnemy, setTypeEnemy] = useState('');

    return(
        <View style={styles.container}>
            <ProgressBarLife progress={lifes / 3}/>
            <Image
                contentFit="contain"
                style={styles.enemy}
                source={ImgEnemy}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    enemy: {
        width: 100,
        height: 150,
    }
});
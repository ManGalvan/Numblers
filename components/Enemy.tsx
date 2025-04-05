import { useState } from "react";
import { View, StyleSheet, Text} from "react-native";
import { Image } from "expo-image";

const ImgEnemy = require('@/assets/images/characters/c7.png');

export default function Enemy(){
    const [life, setLife] = useState(0);
    const [enemyImage, setEnemyImage] = useState('');
    const [typeEnemy, setTypeEnemy] = useState('');

    return(
        <Image
            contentFit="contain"
            style={styles.enemy}
            source={ImgEnemy}
        />
    );
}

const styles = StyleSheet.create({
    enemy: {
        width: 100,
        height: 300,
        alignSelf: 'flex-end',
        margin: 10,
        position: 'relative'
    }
});
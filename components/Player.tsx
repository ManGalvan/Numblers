import { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Image } from "expo-image";

const ImgCharacter = require('@/assets/images/characters/c1.png');

export default function Player(){
    const [lifes, setLifes] = useState(3);
    const [character, setCharacter] = useState('');
    const [grade, setGrade] = useState('');
    return(
        <Image
            contentFit="contain"
            style={styles.character}
            source={ImgCharacter}
        />
    );
}

const styles = StyleSheet.create({
    character: {
        width: 100,
        height: 300,
        alignSelf: 'flex-start',
        margin: 10
    }
});
import { Image } from 'expo-image';
import { View, StyleSheet } from 'react-native';

const logo = require('@/assets/images/logo.png');

export default function Logo() {
    return(
        <View style={styles.imageContainer}>
            <Image
                source={logo}
                style={styles.image}
                contentFit='contain'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imageContainer: {
        flex: 1,
        width: '100%',
        height: 100,
        // backgroundColor: '#fff',
        justifyContent:'center',
    },
    image: {
        width: '80%',
        height: '80%',
        borderRadius: 15,
        alignSelf: 'center',
        marginTop: 20,
    }
});
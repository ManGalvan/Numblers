import * as Progress from 'react-native-progress'
import { StyleSheet } from 'react-native'

export default function ProgressBar({progress}: {progress:number}) {
    return(
        <Progress.Bar
            progress={progress} 
            width={300} 
            height={20}
            color="#AFFA37"
            unfilledColor="#fff"
            borderWidth={0}
            style={styles.progressBar}
        />
    );
}

const styles = StyleSheet.create({
    progressBar: {
        marginBottom: 20,
        marginTop: 20
    }
});
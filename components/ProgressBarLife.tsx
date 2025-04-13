import * as Progress from 'react-native-progress'
import { StyleSheet } from 'react-native'

export default function ProgressBarLife({progress}: {progress:number}) {
    return(
        <Progress.Bar
            progress={progress} 
            width={100} 
            height={10}
            color="red"
            unfilledColor="#fff"
            borderWidth={0}
            style={styles.progressBar}
        />
    );
}

const styles = StyleSheet.create({
    progressBar: {
    }
});
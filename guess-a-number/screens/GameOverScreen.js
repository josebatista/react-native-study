import React from 'react'
import { StyleSheet, View, Button, Image } from 'react-native'

import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <TitleText>The game is Over!</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    // source={require('./../assets/success.png')}
                    source={{ uri: 'https://abrahamswallet.com/wp-content/uploads/2017/12/samuel-ferrara-117219-1180x770.jpg' }}
                    style={styles.image}
                    resizeMode="cover"
                />
            </View>
            <BodyText>Number of rounds: {props.numberOfRounds}</BodyText>
            <BodyText>Number was: {props.userNumber}</BodyText>
            <Button title="New Game" onPress={props.onRestart} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%'
    }
})

export default GameOverScreen

import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    Button,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native'
import BodyText from '../components/BodyText'
import Card from '../components/Card'
import Input from '../components/Input'
import MainButton from '../components/MainButton'
import NumberContainer from '../components/NumberContainer'
import TitleText from '../components/TitleText'

import Colors from '../constants/colors'

const StartGameScreen = props => {

    const [enteredValue, setEnteredValue] = useState('')
    const [isConfirmed, setConfirmed] = useState(false)
    const [selectedNumber, setSelectedNumber] = useState()

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''))
    }

    const resetInputHandler = () => {
        setEnteredValue('')
        setConfirmed(false)
    }

    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number',
                'Number has to be a number between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]
            )
            return
        }
        setConfirmed(true)
        setSelectedNumber(chosenNumber)
        setEnteredValue('')
        Keyboard.dismiss()
    }

    let confirmedOutput
    if (isConfirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <TitleText>You selected</TitleText>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={() => props.onStartGame(selectedNumber)}>
                    START GAME
                </MainButton>
            </Card>
        )
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>Start a New Game!</TitleText>
                        <Card style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='number-pad'
                                maxLength={2}
                                value={enteredValue}
                                onChangeText={numberInputHandler}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={styles.button}>
                                    <Button
                                        title="Reset"
                                        onPress={resetInputHandler}
                                        color={Colors.accent} />
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        title="Confirm"
                                        onPress={confirmInputHandler}
                                        color={Colors.primary} />
                                </View>
                            </View>
                        </Card>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    title: {
        marginVertical: 10
    },
    inputContainer: {
        width: '80%',
        maxWidth: '95%',
        minWidth: 300,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingHorizontal: 15
    },
    button: {
        // width: 100
        width: Dimensions.get('window').width / 4
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: 'center'
    }
})

export default StartGameScreen
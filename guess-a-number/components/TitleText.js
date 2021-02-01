import React from 'react'
import { StyleSheet, Text } from 'react-native'

const TitleText = props => <Text style={{ ...styles.style, ...props.style }}>{props.children}</Text>

const styles = StyleSheet.create({
    style: {
        fontFamily: 'open-sans-bold',
        fontSize: 20
    }
})

export default TitleText
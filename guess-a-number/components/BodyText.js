import React from 'react'
import { StyleSheet, Text } from 'react-native'

const BodyText = props => <Text style={{ ...styles.style, ...props.style }}>{props.children}</Text>

const styles = StyleSheet.create({
    style: {
        fontFamily: 'open-sans'
    }
})

export default BodyText
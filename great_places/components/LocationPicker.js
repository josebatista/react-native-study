import React, { useState } from 'react'
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native'

import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import Colors from '../constants/Colors'

const LocationPicker = () => {

    const [isFetching, setIsFetching] = useState(false)
    const [pickedLocation, setPickedLocation] = useState()

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION)
        if (result.status !== 'granted') {
            Alert.alert(
                'Insufficient permissions!',
                'You need to grant location permissions to use this app.',
                [{ text: 'Okay!' }]
            )
            return false
        }
        return true
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions()
        if (!hasPermission) {
            return
        }

        try {
            setIsFetching(true)
            const location = await Location.getCurrentPositionAsync({})

            setPickedLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
        } catch (err) {
            Alert.alert(
                'Could not fetch location!',
                'Please try again later or pick a location on the map.',
                [{ text: 'Okay' }]
            )
        }
        setIsFetching(false)
    }

    return (
        <View style={styles.locationPicker}>
            <View style={styles.mapPreview}>
                {isFetching ? (
                    <ActivityIndicator size='large' color={Colors.primary} />
                ) : (
                    <Text>No location chosen yet!</Text>
                )}
            </View>
            <Button
                title='Get User Location'
                color={Colors.primary}
                onPress={getLocationHandler}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    locationPicker: {
        marginBottom: 15
    },
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default LocationPicker

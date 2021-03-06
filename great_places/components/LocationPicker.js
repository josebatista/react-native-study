import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native'

import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'

import MapPreview from './MapPreview'

import Colors from '../constants/Colors'

const LocationPicker = props => {

    const [isFetching, setIsFetching] = useState(false)
    const [pickedLocation, setPickedLocation] = useState()

    const mapPickedLocation = props.navigation.getParam('pickedLocation')

    const { onLocationPicked } = props

    useEffect(() => {
        if (mapPickedLocation) {
            setPickedLocation(mapPickedLocation)
            onLocationPicked(mapPickedLocation)
        }
    }, [mapPickedLocation, onLocationPicked])

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
            onLocationPicked({
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

    const pickOnMapHandler = () => {
        props.navigation.navigate('Map')
    }

    return (
        <View style={styles.locationPicker}>
            <MapPreview
                style={styles.mapPreview}
                location={pickedLocation}
                onPress={pickOnMapHandler}
            >
                {isFetching ? (
                    <ActivityIndicator size='large' color={Colors.primary} />
                ) : (
                    <Text>No location chosen yet!</Text>
                )}
            </MapPreview>
            <View style={styles.action}>
                <Button
                    title='Get User Location'
                    color={Colors.primary}
                    onPress={getLocationHandler}
                />
                <Button
                    title='Pick on Map'
                    color={Colors.primary}
                    onPress={pickOnMapHandler}
                />
            </View>
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
        borderWidth: 1
    },
    action: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%'
    }
})

export default LocationPicker

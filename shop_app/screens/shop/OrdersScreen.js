import React, { useState, useEffect } from 'react'
import { View, FlatList, Platform, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'

import HeaderButton from '../../components/UI/HeaderButton'
import OrderItem from '../../components/shop/OrderItem'

import Colors from '../../constants/Colors'
import * as ordersActions from '../../store/actions/orders'

const OrdersScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const orders = useSelector(state => state.orders.orders)
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setError(null)
                setIsLoading(true)
                await dispatch(ordersActions.fetchOrders())
            } catch (err) {
                setError(err.message)
            }
            setIsLoading(false)
        }
        fetchOrders()
    }, [dispatch])

    useEffect(() => {
        if (error) {
            Alert.alert('Something went wrong!', error, [{ text: 'Okay!' }])
        }
    }, [error])

    if (isLoading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size='large' color={Colors.primary} />
            </View>
        )
    }

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData =>
                <OrderItem
                    amount={itemData.item.totalAmount}
                    date={itemData.item.readableDate}
                    items={itemData.item.items}
                />
            }
        />
    )
}

OrdersScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: () => <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
                title='Menu'
                iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                onPress={() => {
                    navData.navigation.toggleDrawer()
                }}
            />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default OrdersScreen
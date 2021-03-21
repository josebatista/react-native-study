export const ADD_ORDER = 'ADD_ORDER'

import BASE_URL from '../../constants/BaseURL'

export const addOrder = (cartItems, totalAmount) => {
    return async dispatch => {

        const date = new Date()

        const response = await fetch(`${BASE_URL}/orders/u1.json`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                cartItems,
                totalAmount,
                date: date.toISOString()
            })
        })

        if (!response.ok) {
            throw Error('Something went wrong!!')
        }

        const resData = await response.json()

        dispatch({ type: ADD_ORDER, orderData: { id: resData.name, items: cartItems, amount: totalAmount, date: date } })
    }
}
import { LOGIN, SIGNUP } from "../actions/auth"

const initialValue = {
    token: null,
    userId: null
}

export default (state = initialValue, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                token: action.token,
                userId: action.userId
            }
        case SIGNUP:
            return {
                token: action.token,
                userId: action.userId
            }
        default:
            return state
    }
}
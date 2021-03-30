import { AUTHENTICATE } from "../actions/auth"

const initialValue = {
    token: null,
    userId: null
}

export default (state = initialValue, action) => {
    switch (action.type) {
        case AUTHENTICATE:
            return {
                token: action.token,
                userId: action.userId
            }
        default:
            return state
    }
}
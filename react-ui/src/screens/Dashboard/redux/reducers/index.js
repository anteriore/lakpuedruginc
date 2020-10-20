import * as actionTypes from '../actions/actionTypes';

const initialState = {
    signedIn = false,
    user = null
}

const data = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.UPDATE_AUTH_STATE:
            return {
                ...state,
                signedIn: action.payload.signedIn,
                user: action.payload.user,
            }
        case actionTypes.UPDATE_USER:
            return {
                ...state,
                user: action.payload.user,
            }
        default:
            return state
    }
}

export default data
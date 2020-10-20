import * as actionTypes from '../actions/actionTypes'

const data = (state = {}, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_START:
            return {
                ...state,
            }
        case actionTypes.LOGIN_FAIL:
            return {
                ...state,
            }
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
            }
        default:
            return state
    }
}

export default data
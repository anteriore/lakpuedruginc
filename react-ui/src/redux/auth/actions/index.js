import * as authActionTypes from './actionTypes';

export const updateAuthState = (payload) => {
    return {
        type: authActionTypes.UPDATE_AUTH_STATE,
        payload,
    }
}
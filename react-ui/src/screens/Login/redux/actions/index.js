import axiosInstance from '../../../utils/axios-instance';
import * as actionTypes from '../actions/actionTypes';
import authActionTypes from '../../../../redux/auth/actions/actionTypes'

export const login = (payload) => {
    return dispatch => {
        dispatch({ type: actionTypes.LOGIN_START })

        const data = {
            username: payload.username,
            password: payload.password
        }

        console.log(data)
        /*
        axiosInstance.post('/api/login', data)
            .then(response => {
                if(response.status == 200){

                    const authData = {
                        signedIn: true,
                        user = response.data.user
                    }

                    dispatch({
                        type: authActionTypes.UPDATE_AUTH_STATE,
                        payload: authData
                    })

                    dispatch({ type: actionTypes.LOGIN_SUCCESS })
                }
            })

        */
    }
}
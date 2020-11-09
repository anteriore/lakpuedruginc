import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios-instance';

const initialState = {
    signedIn: false,
    token: "",
    expired: false,
    user: "",
    error: null
}

export const login = createAsyncThunk('login', async (payload) => {
    const data = {
        username: payload.username,
        password: payload.password
    }
    
    const response = await axiosInstance.post('api/login', data)
    return response

})

/*export const logout = createAsyncThunk('logout', async (payload) => {
    
    const response = await axiosInstance.post('api/logout')
    return response

})
*/


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuthState(state, action) {
            state.signedIn = action.payload.signedIn
            state.token = action.payload.token
            state.expired = action.payload.expired
        },
        resetErrorMsg(state, action) {
            state.error = null
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.status = 'loading'
        },
        [login.fulfilled]: (state, action) => {
            if(action.payload !== undefined && action.payload.status === 200){
                state.status = 'succeeded'
                state.token = action.payload.data.token
                state.expired = action.payload.data.expired
                state.signedIn = true
            }
            else if(typeof(action.payload) == 'undefined'){
                state.status = 'failed'
                state.error = "Unable to connect to server"
            }
            else {
                state.status = 'failed'
                state.error = "Invalid username and/or password"
            }
        },
        [login.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = "Invalid username and/or password"
        }
    },
})

export const { updateAuthState, resetErrorMsg } = authSlice.actions

export default authSlice.reducer
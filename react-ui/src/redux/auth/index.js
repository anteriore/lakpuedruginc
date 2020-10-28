import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios-instance';

const initialState = {
    signedIn: false,
    token: "",
    expired: false,
    user: ""
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
        }
    },
    extraReducers: {
        [login.pending]: (state, action) => {
            state.status = 'loading'
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.token = action.payload.data.token
            state.expired = action.payload.data.expired
            state.signedIn = true
        },
        [login.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = "Wrong username and/or password"
        }
    },
})

export const { updateAuthState } = authSlice.actions

export default authSlice.reducer
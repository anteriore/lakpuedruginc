import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import axiosInstance from '../../../utils/axios-instance';
import { updateAuthState } from '../../../../redux/auth/'

const initialState = {}

export const login = createAsyncThunk('login', async (payload) => {
    const data = {
        username: payload.username,
        password: payload.password
    }
    
    const response = await axiosInstance.post('api/login', data)
    return response

})

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: {
        [login.pending]: (state, action) => {
            state.status = 'loading'
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            var authData = {
                signedIn: true,
                token: action.payload.data.token,
                expired: action.payload.data.expired
            }
            const dispatch = useDispatch()

            dispatch(updateAuthState(authData))
        },
        [login.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    },
})

export default loginSlice.reducer
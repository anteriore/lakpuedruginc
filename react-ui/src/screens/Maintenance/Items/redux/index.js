import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
    list: null
}

export const listI = createAsyncThunk('listI', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token

    const response = await axiosInstance.get("rest/items?token=" + accessToken)
    return response

})

export const addI = createAsyncThunk('addI', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token
    
    const response = await axiosInstance.post('rest/items/?token=' + accessToken, payload)
    return response

})

export const deleteI = createAsyncThunk('deleteI', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token
    
    const response = await axiosInstance.post('rest/items/delete?token=' + accessToken, payload)
    return response

})

const itemSlice = createSlice({
    name: 'items',
    initialState,
    reducers: {},
    extraReducers: {
        [listI.pending]: (state, action) => {
            state.status = 'loading'
        },
        [listI.fulfilled]: (state, action) => {
            if(action.payload !== undefined && action.payload.status === 200){
                state.status = 'succeeded'
                state.list = action.payload.data
            }
            else {
                state.status = 'failed'
            }
        },
        [listI.rejected]: (state, action) => {
            state.status = 'failed'
        },
    },
})

export default itemSlice.reducer
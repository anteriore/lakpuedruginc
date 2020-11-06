import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
    deptList: null,
    areaList: null
}

export const listD = createAsyncThunk('listD', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token

    const response = await axiosInstance.get('rest/departments/company/' + payload.company + "?token=" + accessToken)
    return response

})

export const listA = createAsyncThunk('listA', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token

    const response = await axiosInstance.get('rest/areas/company/' + payload.company + "?token=" + accessToken)
    return response

})

const departmentAreaSlice = createSlice({
    name: 'departmentArea',
    initialState,
    reducers: {},
    extraReducers: {
        [listD.pending]: (state, action) => {
            state.status = 'loading'
        },
        [listD.fulfilled]: (state, action) => {
            if(action.payload !== undefined && action.payload.status == 200){
                state.status = 'succeeded'
                state.deptList = action.payload.data
            }
            else {
                state.status = 'failed'
            }
        },
        [listD.rejected]: (state, action) => {
            state.status = 'failed'
        },

        
        [listA.pending]: (state, action) => {
            state.status = 'loading'
        },
        [listA.fulfilled]: (state, action) => {
            if(action.payload !== undefined && action.payload.status == 200){
                state.status = 'succeeded'
                state.areaList = action.payload.data
            }
            else {
                state.status = 'failed'
            }
        },
        [listA.rejected]: (state, action) => {
            state.status = 'failed'
        },
    },
})

export default departmentAreaSlice.reducer
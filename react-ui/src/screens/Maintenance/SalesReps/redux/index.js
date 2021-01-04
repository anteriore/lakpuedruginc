import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { message as Message } from 'antd';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listS = createAsyncThunk('listS', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/sales-reps?token=${accessToken}`);
  return response;
});

export const addS = createAsyncThunk('addS', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/sales-reps/?token=${accessToken}`, payload);
  return response;
});

export const deleteS = createAsyncThunk('deleteS', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/sales-reps/delete?token=${accessToken}`, payload);
  return response;
});

const salesRepSlice = createSlice({
  name: 'salesReps',
  initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listS.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listS.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for sales reps"
          Message.warning(statusMessage)
        }

        return {
          ...state,
          list: data,
          status: 'succeeded',
          action: 'get',
          statusMessage: statusMessage,
        };
      }
      else {
        Message.error(message.ITEMS_GET_REJECTED)
        return {
          ...state,
          status: 'failed',
          action: 'get',
          statusMessage: message.ITEMS_GET_REJECTED,
        };
      }
    },
    [listS.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = salesRepSlice.actions;
export default salesRepSlice.reducer;

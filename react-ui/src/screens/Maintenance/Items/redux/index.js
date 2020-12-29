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

export const listI = createAsyncThunk('listI', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/items?token=${accessToken}`);
  return response;
});

export const addI = createAsyncThunk('addI', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/items/?token=${accessToken}`, payload);
  return response;
});

export const deleteI = createAsyncThunk('deleteI', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/items/delete?token=${accessToken}`, payload);
  return response;
});

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listI.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listI.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for items"
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
    [listI.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = itemSlice.actions;
export default itemSlice.reducer;

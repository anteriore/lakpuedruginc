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

export const listClient = createAsyncThunk('listClient', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(
    `rest/clients/company/${payload.company}/?token=${accessToken}`
  );
  return response;
});

export const addClient = createAsyncThunk('addClient', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/clients/?token=${accessToken}`, payload);
  return response;
});

export const deleteClient = createAsyncThunk('deleteClient', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/clients/delete?token=${accessToken}`, payload);
  return response;
});

export const getClient = createAsyncThunk('getClient', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/clients/${payload.id}?token=${accessToken}`);
  return response;
});

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listClient.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listClient.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for clients"
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
    [listClient.rejected]: (state, action) => {
      Message.error(message.ITEMS_GET_REJECTED)
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = clientSlice.actions;
export default clientSlice.reducer;

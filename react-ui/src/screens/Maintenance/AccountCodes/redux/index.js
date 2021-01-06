import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { message as Message } from 'antd';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
 
const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listAC = createAsyncThunk('listAC', async (payload, thunkAPI, rejectWithValue ) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/account-codes?token=${accessToken}`);
  
  if(typeof response !== 'undefined' && response.status === 200){
    const { data } = response;
    if( data.length === 0){
      payload.message.warning("No data retrieved for account codes")
    }
  }
  else {
    payload.message.error(message.ITEMS_GET_REJECTED)
    return rejectWithValue(response)
  }
  return response;
});

export const addAC = createAsyncThunk('addAC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/account-codes/?token=${accessToken}`, payload);
  return response;
});

export const deleteAC = createAsyncThunk('deleteAC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/account-codes/delete?token=${accessToken}`,
    payload
  );
  return response;
});

const accountCodeSlice = createSlice({
  name: 'accountCodes',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listAC.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listAC.fulfilled]: (state, action) => {
      const { data } = action.payload;
      var statusMessage = message.ITEMS_GET_FULFILLED

      if( data.length === 0){
        statusMessage = "No data retrieved for account codes"
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage: statusMessage,
      };
    },
    [listAC.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = accountCodeSlice.actions;
export default accountCodeSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listDepot = createAsyncThunk('listDepot', async (payload, thunkAPI, rejectWithValue) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/depots?token=${accessToken}`);
  
  if(typeof response !== 'undefined' && response.status === 200){
    const { data } = response;
    if( data.length === 0){
      payload.message.warning("No data retrieved for bank accounts")
    }
  }
  else {
    payload.message.error(message.ITEMS_GET_REJECTED)
    return rejectWithValue(response)
  }

  return response;
});

export const addDepot = createAsyncThunk('addDepot', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/depots/?token=${accessToken}`, payload);
  return response;
});

export const deleteDepot = createAsyncThunk('deleteDepot', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/depots/delete?token=${accessToken}`, payload);
  return response;
});

const depotSlice = createSlice({
  name: 'depots',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listDepot.pending]: (state) => {
      state.status = 'loading';
    },
    [listDepot.fulfilled]: (state, action) => {
      const { data } = action.payload;
      var statusMessage = message.ITEMS_GET_FULFILLED

      if( data.length === 0){
        statusMessage = "No data retrieved for depots"
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage: statusMessage,
      };
    },
    [listDepot.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = depotSlice.actions;
export default depotSlice.reducer;

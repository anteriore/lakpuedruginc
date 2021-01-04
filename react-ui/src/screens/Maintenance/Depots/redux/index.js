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

export const listDepot = createAsyncThunk('listDepot', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/depots?token=${accessToken}`);
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
      if (typeof action.payload !== 'undefined' && action.payload.status === 200) {
        const { data } = action.payload;
        let statusMessage = message.ITEMS_GET_FULFILLED;

        if (data.length === 0) {
          statusMessage = 'No data retrieved for depots';
          Message.warning(statusMessage);
        }

        return {
          ...state,
          list: data,
          status: 'succeeded',
          action: 'get',
          statusMessage,
        };
      }

      Message.error(message.ITEMS_GET_REJECTED);
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listDepot.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = depotSlice.actions;
export default depotSlice.reducer;

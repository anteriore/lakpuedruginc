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

export const listIT = createAsyncThunk('listIT', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/item-types?token=${accessToken}`);
  return response;
});

export const addIT = createAsyncThunk('addIT', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/item-types/?token=${accessToken}`, payload);
  return response;
});

export const deleteIT = createAsyncThunk('deleteIT', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/item-types/delete?token=${accessToken}`, payload);
  return response;
});

const itemTypeSlice = createSlice({
  name: 'itemTypes',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listIT.pending]: (state) => {
      state.status = 'loading';
    },
    [listIT.fulfilled]: (state, action) => {
      if (typeof action.payload !== 'undefined' && action.payload.status === 200) {
        const { data } = action.payload;
        let statusMessage = message.ITEMS_GET_FULFILLED;

        if (data.length === 0) {
          statusMessage = 'No data retrieved for item types';
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
    [listIT.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = itemTypeSlice.actions;
export default itemTypeSlice.reducer;

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

export const listVendor = createAsyncThunk('listVendor', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  console.log(`rest/vendors/${payload.company}?token=${accessToken}`);

  const response = await axiosInstance.get(
    `rest/vendors/company/${payload.company}/?token=${accessToken}`
  );
  return response;
});

export const addVendor = createAsyncThunk('addVendor', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/vendors/?token=${accessToken}`, payload);
  return response;
});

export const getVendor = createAsyncThunk('getVendor', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/vendors/${payload.id}?token=${accessToken}`);
  return response;
});

export const deleteVendor = createAsyncThunk('deleteVendor', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/vendors/delete?token=${accessToken}`, payload);
  return response;
});

const vendorSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listVendor.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listVendor.fulfilled]: (state, action) => {
      if (typeof action.payload !== 'undefined' && action.payload.status === 200) {
        const { data } = action.payload;
        let statusMessage = message.ITEMS_GET_FULFILLED;

        if (data.length === 0) {
          statusMessage = 'No data retrieved for vendors';
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
    [listVendor.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = vendorSlice.actions;
export default vendorSlice.reducer;

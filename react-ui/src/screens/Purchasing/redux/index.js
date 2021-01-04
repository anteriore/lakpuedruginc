import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { message as Message } from 'antd';
import axiosInstance from '../../../utils/axios-instance';
import * as message from '../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listPO = createAsyncThunk('listPO', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  console.log(`rest/clients/${payload.company}?token=${accessToken}`);

  const response = await axiosInstance.get(
    `rest/purchase-orders/company/${payload.company}/?token=${accessToken}`
  );
  return response;
});

export const addPO = createAsyncThunk('addPO', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/purchase-orders/?token=${accessToken}`, payload);
  return response;
});

export const deletePO = createAsyncThunk('deletePO', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/purchase-orders/delete?token=${accessToken}`,
    payload
  );
  return response;
});

export const getPO = createAsyncThunk('getPO', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/purchase-orders/${payload.id}?token=${accessToken}`
  );
  return response;
});

const purchaseOrderSlice = createSlice({
  name: 'purchaseOrders',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listPO.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listPO.fulfilled]: (state, action) => {
      if (typeof action.payload !== 'undefined' && action.payload.status === 200) {
        const { data } = action.payload;
        let statusMessage = message.ITEMS_GET_FULFILLED;

        if (data.length === 0) {
          statusMessage = 'No data retrieved for purchase orders';
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
    [listPO.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;

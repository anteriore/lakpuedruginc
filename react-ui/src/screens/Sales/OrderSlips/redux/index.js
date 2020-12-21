import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../datas/constants/response-message.constant';

export const listOrderSlips = createAsyncThunk('listOrderSlips', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(
    `/rest/order-slips/company/${payload}?token=${accessToken}`
  );

  return response;
});

export const createOrderSlips = createAsyncThunk('createOrderSlips', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/order-slips?token=${accessToken}`, payload);

  return response;
});

export const updateOrderSlips = createAsyncThunk('updateOrderSlips', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/order-slips?token=${accessToken}`, payload);

  return response;
});

export const deleteOrderSlips = createAsyncThunk('deleteOrderSlips', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { id } = payload;
  const response = await axiosInstance.post(`/rest/order-slips/delete?token=${accessToken}`, id);

  return response;
});

const orderSlipsSlice = createSlice({
  name: 'orderSlips',
  initialState: {
    orderSlipsList: [],
    status: '',
    statusMessage: '',
    action: '',
  },
  reducers: {},
  extraReducers: {
    [listOrderSlips.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listOrderSlips.fulfilled]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        orderSlipsList: data,
        status: 'Fulfilled',
        action: 'get',
        statusMessage: message.ITEMS_GET_FULFILLED,
      };
    },
    [listOrderSlips.rejected]: (state) => {
      return {
        ...state,
        orderSlipsList: [],
        status: 'Error',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [createOrderSlips.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_ADD_PENDING,
      };
    },
    [createOrderSlips.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_ADD_FULFILLED,
      };
    },
    [createOrderSlips.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_ADD_REJECTED,
      };
    },
    [updateOrderSlips.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_UPDATE_PENDING,
      };
    },
    [updateOrderSlips.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_UPDATE_FULFILLED,
      };
    },
    [updateOrderSlips.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_UPDATE_REJECTED,
      };
    },
    [deleteOrderSlips.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_DELETE_PENDING,
      };
    },
    [deleteOrderSlips.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_DELETE_FULFILLED,
      };
    },
    [deleteOrderSlips.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
  },
});

export default orderSlipsSlice.reducer;

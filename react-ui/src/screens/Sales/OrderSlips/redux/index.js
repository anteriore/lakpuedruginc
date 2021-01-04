import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

export const listOrderSlips = createAsyncThunk('listOrderSlips', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(
    `/rest/order-slips/company/${payload.company}?token=${accessToken}`
  );
  
  if(typeof response !== 'undefined' && response.status === 200){
    const { data } = response;
    if( data.length === 0){
      payload.message.warning("No data retrieved for order slips")
    }
  }
  else {
    payload.message.error(message.ITEMS_GET_REJECTED)
  }


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

const initialState = {
  orderSlipsList: [],
  status: '',
  statusMessage: '',
  action: '',
}

const orderSlipsSlice = createSlice({
  name: 'orderSlips',
  initialState: initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listOrderSlips.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listOrderSlips.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for order slips"
        }

        return {
          ...state,
          orderSlipsList: data,
          status: 'succeeded',
          action: 'get',
          statusMessage: statusMessage,
        };
      }
      else {
        return {
          ...state,
          status: 'failed',
          action: 'get',
          statusMessage: message.ITEMS_GET_REJECTED,
        };
      }
    },
    [listOrderSlips.rejected]: (state) => {
      return {
        ...state,
        orderSlipsList: [],
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [createOrderSlips.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_ADD_PENDING,
      };
    },
    [createOrderSlips.fulfilled]: (state) => {
      return {
        ...state,
        status: 'succeeded',
        action: 'post',
        statusMessage: message.ITEM_ADD_FULFILLED,
      };
    },
    [createOrderSlips.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_ADD_REJECTED,
      };
    },
    [updateOrderSlips.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_UPDATE_PENDING,
      };
    },
    [updateOrderSlips.fulfilled]: (state) => {
      return {
        ...state,
        status: 'succeeded',
        action: 'post',
        statusMessage: message.ITEM_UPDATE_FULFILLED,
      };
    },
    [updateOrderSlips.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_UPDATE_REJECTED,
      };
    },
    [deleteOrderSlips.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_DELETE_PENDING,
      };
    },
    [deleteOrderSlips.fulfilled]: (state) => {
      return {
        ...state,
        status: 'succeeded',
        action: 'post',
        statusMessage: message.ITEM_DELETE_FULFILLED,
      };
    },
    [deleteOrderSlips.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
  },
});

export const { clearData } = orderSlipsSlice.actions;
export default orderSlipsSlice.reducer;

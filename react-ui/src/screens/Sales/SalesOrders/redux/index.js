import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { message as Message } from 'antd';

export const listSalesOrder = createAsyncThunk('listSalesOrder', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(
    `/rest/sales-orders/company/${payload}?token=${accessToken}`
  );

  return response;
});

export const createSalesOrder = createAsyncThunk('createSalesOrder', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/sales-orders?token=${accessToken}`, payload);

  return response;
});

export const updateSalesOrder = createAsyncThunk('updateSalesOrder', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/sales-orders?token=${accessToken}`, payload);

  return response;
});

export const deleteSalesOrder = createAsyncThunk('deleteSalesOrder', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { id } = payload;
  const response = await axiosInstance.post(`/rest/sales-orders/delete?token=${accessToken}`, id);

  return response;
});

export const listSalesOrderByDepot = createAsyncThunk(
  'listSalesOrderByDepot',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get(
      `/rest/sales-orders/depot/${payload}?token=${accessToken}`
    );

    return response;
  }
);
const initialState = {
  salesOrderList: [],
  status: '',
  statusMessage: '',
  action: '',
}

const salesOrdersSlice = createSlice({
  name: 'salesOrders',
  initialState: initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listSalesOrder.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listSalesOrder.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for sales orders"
          Message.warning(statusMessage)
        }

        return {
          ...state,
          salesOrderList: data,
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
    [listSalesOrder.rejected]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        salesOrderList: data,
        status: 'Error',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listSalesOrderByDepot.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listSalesOrderByDepot.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for sales orders"
          Message.warning(statusMessage)
        }

        return {
          ...state,
          salesOrderList: data,
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
    [listSalesOrderByDepot.rejected]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        salesOrderList: data,
        status: 'Error',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [createSalesOrder.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_ADD_PENDING,
      };
    },
    [createSalesOrder.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_ADD_FULFILLED,
      };
    },
    [createSalesOrder.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_ADD_REJECTED,
      };
    },
    [updateSalesOrder.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_UPDATE_PENDING,
      };
    },
    [updateSalesOrder.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_UPDATE_FULFILLED,
      };
    },
    [updateSalesOrder.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_UPDATE_REJECTED,
      };
    },
    [deleteSalesOrder.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_DELETE_PENDING,
      };
    },
    [deleteSalesOrder.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_DELETE_FULFILLED,
      };
    },
    [deleteSalesOrder.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
  },
});

export const { clearData } = salesOrdersSlice.actions;
export default salesOrdersSlice.reducer;

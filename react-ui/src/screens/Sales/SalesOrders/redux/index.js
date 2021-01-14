import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

export const listSalesOrder = createAsyncThunk('listSalesOrder', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company, fnCallback } = payload;
  const response = await axiosInstance.get(
    `/rest/sales-orders/company/${company}?token=${accessToken}`
  );

  if (typeof response !== 'undefined') {
    const { status } = response;
    if (status === 200) {
      if (response.data.length === 0) {
        response.statusText = `${message.API_200_EMPTY} in sales order.`;
      } else {
        response.statusText = `${message.API_200_SUCCESS} in sales order.`;
      }
      fnCallback(response);
      return response;
    }

    if (status === 500 || status === 400) {
      fnCallback(response);
      return thunkAPI.rejectWithValue(response);
    }
  } else {
    return thunkAPI.rejectWithValue(response);
  }

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

export const approveSalesOrder = createAsyncThunk(
  'approveSalesOrder',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post(
      `/rest/sales-orders/approve/${payload}?token=${accessToken}`
    );

    return response;
  }
);

export const rejectSalesOrder = createAsyncThunk('rejectSalesOrder', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(
    `/rest/sales-orders/reject/${payload}?token=${accessToken}`
  );

  return response;
});

export const listSalesOrderByDepot = createAsyncThunk(
  'listSalesOrderByDepot',
  async (payload, thunkAPI, rejectWithValue) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get(
      `/rest/sales-orders/depot/${payload}?token=${accessToken}`
    );

    if (typeof response !== 'undefined' && response.status === 200) {
      const { data } = response;
      if (data.length === 0) {
        payload.message.warning('No data retrieved for sales orders');
      }
    } else {
      payload.message.error(message.ITEMS_GET_REJECTED);
      return rejectWithValue(response);
    }

    return response;
  }
);
const initialState = {
  salesOrderList: [],
  status: '',
  statusMessage: '',
  action: '',
};

const salesOrdersSlice = createSlice({
  name: 'salesOrders',
  initialState,
  reducers: {
    clearData: () => initialState,
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
      const { data } = action.payload;

      return {
        ...state,
        salesOrderList: data,
        status: 'succeeded',
        action: 'get',
        statusMessage: message.ITEMS_GET_FULFILLED,
      };
    },
    [listSalesOrder.rejected]: (state, _) => {
      return {
        ...state,
        status: 'failed',
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
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for sales orders';
      }

      return {
        ...state,
        salesOrderList: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
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

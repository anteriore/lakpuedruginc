import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

export const listOrderSlips = createAsyncThunk('listOrderSlips', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company, fnCallback } = payload;
  const response = await axiosInstance.get(
    `/rest/order-slips/company/${company}?token=${accessToken}`
  );

  if (typeof response !== 'undefined') {
    const { status } = response;
    if (status === 200) {
      if (response.data.length === 0) {
        response.statusText = `${message.API_200_EMPTY} in order slips.`;
      } else {
        response.statusText = `${message.API_200_SUCCESS} in order slips.`;
      }
      fnCallback(response);
      return response;
    }

    if (status === 500 || status === 400) {
      fnCallback(response);
      return thunkAPI.rejectWithValue(response);
    }
  } else {
    const newReponse = {
      status: 500,
      statusText: message.API_UNDEFINED,
    };
    fnCallback(newReponse);
    return thunkAPI.rejectWithValue(response);
  }

  return response;
});

export const listOrderSlipsByDepot = createAsyncThunk(
  'listOrderSlipsByDepot',
  async (payload, thunkAPI, rejectWithValue) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get(
      `/rest/order-slips/depot/${payload.depot}?token=${accessToken}`
    );

    if (typeof response !== 'undefined' && response.status === 200) {
      const { data } = response;
      if (data.length === 0) {
        payload.message.warning('No data retrieved for order slips from the selected depot');
      }
    } else {
      payload.message.error(message.ITEMS_GET_REJECTED);
      return rejectWithValue(response);
    }

    return response;
  }
);

export const listOrderSlipsWithBalanceByDepot = createAsyncThunk(
  'listOrderSlipsWithBalanceByDepot',
  async (payload, thunkAPI, rejectWithValue) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get(
      `/rest/order-slips/depot/${payload.depot}?token=${accessToken}`
    );

    const processedResponse = {
      ...response,
      data: filterOSWithBalance(response.data)
    }

    if (typeof response !== 'undefined' && response.status === 200) {
      const { data } = processedResponse;
      if (data.length === 0) {
        payload.message.warning('No data retrieved for order slips from the selected depot');
      }
    } else {
      payload.message.error(message.ITEMS_GET_REJECTED);
      return rejectWithValue(processedResponse);
    }

    return processedResponse;
  }
);

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

const filterOSWithBalance = (data) => {
  const processedData = []
  data.forEach((orderSlip) => {
    if(orderSlip.remainingBalance > 0){
      processedData.push(orderSlip)
    }
  })

  return processedData

}

const initialState = {
  orderSlipsList: [],
  status: '',
  statusMessage: '',
  action: '',
};

const orderSlipsSlice = createSlice({
  name: 'orderSlips',
  initialState,
  reducers: {
    clearData: () => initialState,
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
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for order slips';
      }

      return {
        ...state,
        orderSlipsList: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listOrderSlips.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listOrderSlipsWithBalanceByDepot.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listOrderSlipsWithBalanceByDepot.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for order slips from the selected depot';
      }

      return {
        ...state,
        orderSlipsList: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listOrderSlipsWithBalanceByDepot.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listOrderSlipsByDepot.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listOrderSlipsByDepot.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for order slips from the selected depot';
      }

      return {
        ...state,
        orderSlipsList: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listOrderSlipsByDepot.rejected]: (state) => {
      return {
        ...state,
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

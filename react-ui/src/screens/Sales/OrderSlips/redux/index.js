import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

export const listOrderSlips = createAsyncThunk('listOrderSlips', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(
      `/rest/order-slips/company/${payload}?token=${accessToken}`
    );

    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
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

export const listOrderSlipsByDepotAndBalance = createAsyncThunk(
  'listOrderSlipsByDepotAndBalance',
  async (payload, thunkAPI, rejectWithValue) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get(
      `/rest/order-slips/depot/${payload.depot}?token=${accessToken}`
    );

    const processedResponse = {
      ...response,
      data: filterOSByBalance(response.data, payload.hasBalance),
    };

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

export const listOrderSlipsByDepotAndStatus = createAsyncThunk(
  'listOrderSlipsByDepotAndStatus',
  async (payload, thunkAPI, rejectWithValue) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get(
      `/rest/order-slips/depot/${payload.depot}?token=${accessToken}`
    );

    const processedResponse = {
      ...response,
      data: filterOSByStatus(response.data, payload.statuses),
    };

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

  try {
    const response = await axiosInstance.post(`/rest/order-slips?token=${accessToken}`, payload);

    const { response: validateResponse, valid } = checkResponseValidity(response);
    if (valid) {
      return validateResponse;
    }
    return thunkAPI.rejectWithValue(validateResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const filterOSByBalance = (data, hasBalance) => {
  const processedData = [];
  data.forEach((orderSlip) => {
    if (hasBalance) {
      if (orderSlip.remainingBalance > 0) {
        processedData.push(orderSlip);
      }
    } else if (orderSlip.remainingBalance === 0) {
      processedData.push(orderSlip);
    }
  });

  return processedData;
};

const filterOSByStatus = (data, statuses) => {
  const processedData = [];
  data.forEach((orderSlip) => {
    if (statuses.includes(orderSlip.status)) {
      processedData.push(orderSlip);
    }
  });
  return processedData;
};

const initialState = {
  orderSlipsList: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
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
        action: 'fetch',
        status: 'loading',
        statusMessage: `${message.ITEMS_GET_PENDING} for order slips`,
      };
    },
    [listOrderSlips.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Order Slips',
        state.action
      );

      return {
        ...state,
        orderSlipsList: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [listOrderSlips.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Order Slips',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage,
      };
    },
    [listOrderSlipsByDepotAndBalance.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listOrderSlipsByDepotAndBalance.fulfilled]: (state, action) => {
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
    [listOrderSlipsByDepotAndBalance.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listOrderSlipsByDepotAndStatus.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listOrderSlipsByDepotAndStatus.fulfilled]: (state, action) => {
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
    [listOrderSlipsByDepotAndStatus.rejected]: (state) => {
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
        action: 'create',
        status: 'loading',
        statusMessage: `${message.ITEM_ADD_PENDING} for order slips`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [createOrderSlips.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Order Slips',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [createOrderSlips.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Order Slips',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
  },
});

export const { clearData } = orderSlipsSlice.actions;
export default orderSlipsSlice.reducer;

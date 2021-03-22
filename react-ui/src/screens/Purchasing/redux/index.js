import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios-instance';
import * as message from '../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../helpers/general-helper';

const initialState = {
  list: null,
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listPO = createAsyncThunk('listPO', async (payload, thunkAPI, rejectWithValue) => {
  const accessToken = thunkAPI.getState().auth.token;

  try { 
  const response = await axiosInstance.get(
    `rest/purchase-orders/company/${payload.company}/?token=${accessToken}`
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

export const getOrderedQuantityByItem = createAsyncThunk(
  'getOrderedQuantityByItem',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { company, item } = payload;

    const response = await axiosInstance.get(
      `rest/purchase-orders/company/${company}/stock/${item}?token=${accessToken}`
    );

    if (typeof response !== 'undefined' && response.status === 200) {
      const { data } = response;
      if (data.length === 0) {
        payload.message.warning('No data retrieved for requested items');
      }
    } else {
      payload.message.error(message.ITEMS_GET_REJECTED);
      return thunkAPI.rejectWithValue(response);
    }

    return response;
  }
);

export const addPO = createAsyncThunk('addPO', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try { 
    const response = await axiosInstance.post(`rest/purchase-orders/?token=${accessToken}`, payload);
  
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const deletePO = createAsyncThunk('deletePO', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try { 
    const response = await axiosInstance.post(
      `rest/purchase-orders/delete?token=${accessToken}`,
      payload
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

export const getPO = createAsyncThunk('getPO', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.get(
      `rest/purchase-orders/${payload.id}?token=${accessToken}`
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

const purchaseOrderSlice = createSlice({
  name: 'purchaseOrders',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listPO.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for Purchase Order`,
      };
    },
    [listPO.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Purchase Order');

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [listPO.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Purchase Order');

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage: message,
      };
    },
  },
});

export const { clearData } = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listPD = createAsyncThunk('listPD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.get(`rest/product-division-codes?token=${accessToken}`);

    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

export const addPD = createAsyncThunk('addPD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.post(
      `rest/product-division-codes/?token=${accessToken}`,
      payload
    );

    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

export const updatePD = createAsyncThunk('updatePD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.post(
      `rest/product-division-codes/?token=${accessToken}`,
      payload
    );

    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

export const deletePD = createAsyncThunk('deletePD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.post(
      `rest/product-division-codes/delete?token=${accessToken}`,
      payload
    );

    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

const productDivisionSlice = createSlice({
  name: 'productDivisions',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listPD.pending]: (state) => {
      return { 
        ...state,  
        action: 'fetch', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Product Divisions` 
      };
    },
    [listPD.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Product Divisions', state.action);

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [listPD.rejected]: (state, action) => {
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Product Divisions',
        state.action
      );

      return {
        ...state,
        data: [],
        status: 'failed',
        statusLevel: level,
        responseCode: null,
        statusMessage,
      };
    },
    [addPD.pending]: (state) => {
      return { 
        ...state,  
        action: 'create', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Product Divisions` 
      };
    },
    [addPD.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Product Divisions', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [addPD.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Product Divisions',
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
    [updatePD.pending]: (state) => {
      return { 
        ...state,  
        action: 'update', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Product Divisions` 
      };
    },
    [updatePD.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Product Divisions', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [updatePD.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Product Divisions',
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
    [deletePD.pending]: (state) => {
      return { 
        ...state,  
        action: 'delete', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Product Divisions` 
      };
    },
    [deletePD.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Product Divisions', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [deletePD.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Product Divisions',
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

export const { clearData } = productDivisionSlice.actions;
export default productDivisionSlice.reducer;

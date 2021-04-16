import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import {checkResponseValidity, generateStatusMessage} from '../../../../helpers/general-helper';

const initialState = {
  list: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listInventory = createAsyncThunk('listInventory', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(
      `rest/inventory/company/${payload.company}?token=${accessToken}`
    );

    const { response: validateResponse, valid } = checkResponseValidity(response);
    if (valid) {
      return validateResponse;
    }
    return thunkAPI.rejectWithValue(validateResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: message.ERROR_OCCURED
    });
  }
});

export const listInventoryByStock = createAsyncThunk('listInventoryByStock', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(
      `rest/inventory/company/${payload.company}?token=${accessToken}`
    );

    const processedResponse = {
      ...response,
      data: filterInventoryByStock(response.data),
    };

    const { response: validateResponse, valid } = checkResponseValidity(processedResponse);
    if (valid) {
      return validateResponse;
    }
    return thunkAPI.rejectWithValue(validateResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: message.ERROR_OCCURED
    });
  }
});

export const addInventory = createAsyncThunk(
  'addInventory',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.post(`/rest/inventory?token=${accessToken}`, payload );

    const { response: validateResponse, valid } = checkResponseValidity(response);
    if (valid) {
      return validateResponse;
    }
    return thunkAPI.rejectWithValue(validateResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: message.ERROR_OCCURED
    });
  }
});

export const updateInventory = createAsyncThunk('updateInventory', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/inventory/?token=${accessToken}`, payload);

  return response;
});

export const deleteInventory = createAsyncThunk('deleteInventory', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`rest/inventory/delete?token=${accessToken}`, payload);

  return response;
});

export const getInventory = createAsyncThunk(
  'getInventory',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.get(
      `rest/inventory/${payload.id}?token=${accessToken}`
    );
    return response;
  }
);

const filterInventoryByStock = (data) => {
  const processedData = [];
  data.forEach((inventory) => {
    if (inventory.quantity > 0) {
      processedData.push(inventory);
    }
  });

  return processedData;
};

const inventorySlice = createSlice({
  name: 'inventory',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listInventory.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for inventory`
      }
    },
    [listInventory.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const {message: statusMessage, level} = generateStatusMessage(
        action.payload, 'Inventory',
        state.action  
      );

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage
      }
    },
    [listInventory.rejected]: (state, action) => {
      const {status} = action.payload;
      const {message: statusMessage, level} = generateStatusMessage(
        action.payload, 
        'Inventory',
        state.action  
      );

      return {
        ...state,
        list: [],
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage
      }
    },
    [listInventoryByStock.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for inventory`
      }
    },
    [listInventoryByStock.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const {message: statusMessage, level} = generateStatusMessage(
        action.payload, 'Inventory',
        state.action  
      );

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage
      }
    },
    [listInventoryByStock.rejected]: (state, action) => {
      const {status} = action.payload;
      const {message: statusMessage, level} = generateStatusMessage(
        action.payload, 
        'Inventory',
        state.action  
      );

      return {
        ...state,
        list: [],
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage
      }
    },
    [addInventory.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusMessage: `${message.ITEM_ADD_PENDING} for inventory`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [addInventory.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Inventory'
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [addInventory.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Approved Receipts'
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

export const { clearData } = inventorySlice.actions;
export default inventorySlice.reducer;

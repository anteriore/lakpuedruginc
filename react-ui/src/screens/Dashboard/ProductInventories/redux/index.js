import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: [],
  status: '',
  statusMessage: '',
  action: '',
};

export const listProductInventory = createAsyncThunk('listProductInventory', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company } = payload

  try {
    const response = await axiosInstance.get(`rest/product-inventory/company/${company}?token=${accessToken}`);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }

});

export const listProductInventoryByDepot = createAsyncThunk('listProductInventoryByDepot', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { depot } = payload

  try {
    const response = await axiosInstance.get(`rest/product-inventory/depot/${depot}?token=${accessToken}`);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }

});

export const addProductInventory = createAsyncThunk('addProductInventory', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/product-inventory/?token=${accessToken}`, payload);
  return response;
});

export const deleteProductInventory = createAsyncThunk('deleteProductInventory', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/product-inventory/delete?token=${accessToken}`, payload);
  return response;
});

const productInventorySlice = createSlice({
  name: 'productInventories',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listProductInventory.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listProductInventory.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Product Inventory');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listProductInventory.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listProductInventoryByDepot.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listProductInventoryByDepot.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Product Inventory');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listProductInventoryByDepot.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = productInventorySlice.actions;
export default productInventorySlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message as Message } from 'antd';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

export const listProductInventory = createAsyncThunk(
  'listProductInventory',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { fnCallback } = payload;
    const response = await axiosInstance.get(`rest/product-inventory?token=${accessToken}`);

    if (typeof response !== 'undefined') {
      const { status } = response;
      if (status === 200) {
        if (response.data.length === 0) {
          response.statusText = `${message.API_200_EMPTY} in clients`;
        } else {
          response.statusText = `${message.API_200_SUCCESS} in clients`;
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
  }
);

export const listProductInventoryByDepot = createAsyncThunk(
  'listProductInventoryByDepot',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get(
      `/rest/product-inventory/depot/${payload}?token=${accessToken}`
    );

    return response;
  }
);

const initialState = {
  list: [],
  status: '',
  statusMessage: '',
  action: '',
};

const productInventorySlice = createSlice({
  name: 'productInventory',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listProductInventory.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listProductInventory.fulfilled]: (state, action) => {
      if (typeof action.payload !== 'undefined' && action.payload.status === 200) {
        const { data } = action.payload;
        let statusMessage = message.ITEMS_GET_FULFILLED;

        if (data.length === 0) {
          statusMessage = 'No data retrieved for product inventory';
          Message.warning(statusMessage);
        }

        return {
          ...state,
          list: data,
          status: 'succeeded',
          action: 'get',
          statusMessage,
        };
      }

      Message.error(message.ITEMS_GET_REJECTED);
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listProductInventory.rejected]: (state) => {
      return {
        ...state,
        list: [],
        status: 'Error',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = productInventorySlice.actions;
export default productInventorySlice.reducer;

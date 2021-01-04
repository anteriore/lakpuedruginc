import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { message as Message } from 'antd';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listPC = createAsyncThunk('listPC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/product-categories?token=${accessToken}`);
  return response;
});

export const addPC = createAsyncThunk('addPC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/product-categories/?token=${accessToken}`,
    payload
  );
  return response;
});

export const deletePC = createAsyncThunk('deletePC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/product-categories/delete?token=${accessToken}`,
    payload
  );
  return response;
});

const productCategorySlice = createSlice({
  name: 'productCategories',
  initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listPC.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listPC.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for product categories"
          Message.warning(statusMessage)
        }

        return {
          ...state,
          list: data,
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
    [listPC.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = productCategorySlice.actions;
export default productCategorySlice.reducer;

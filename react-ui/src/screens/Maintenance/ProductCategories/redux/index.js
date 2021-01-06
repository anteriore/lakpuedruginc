import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listPC = createAsyncThunk('listPC', async (payload, thunkAPI, rejectWithValue) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/product-categories?token=${accessToken}`);
  
  if(typeof response !== 'undefined' && response.status === 200){
    const { data } = response;
    if( data.length === 0){
      payload.message.warning("No data retrieved for product categories")
    }
  }
  else {
    payload.message.error(message.ITEMS_GET_REJECTED)
    return rejectWithValue(response)
  }

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
    clearData: () => initialState,
  },
  extraReducers: {
    [listPC.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listPC.fulfilled]: (state, action) => {
      const { data } = action.payload;
      var statusMessage = message.ITEMS_GET_FULFILLED

      if( data.length === 0){
        statusMessage = "No data retrieved for product categories"
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage: statusMessage,
      };
    },
    [listPC.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = productCategorySlice.actions;
export default productCategorySlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
  list: null,
};

export const listPC = createAsyncThunk('listPC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/product-categories?token=${accessToken}`);
  return response;
});

export const addPC = createAsyncThunk('addPC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/product-categories/?token=${accessToken}`, payload);
  return response;
});

export const deletePC = createAsyncThunk('deletePC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/product-categories/delete?token=${accessToken}`, payload);
  return response;
});

const productCategorySlice = createSlice({
  name: 'productCategories',
  initialState,
  reducers: {},
  extraReducers: {
    [listPC.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listPC.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.list = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listPC.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default productCategorySlice.reducer;

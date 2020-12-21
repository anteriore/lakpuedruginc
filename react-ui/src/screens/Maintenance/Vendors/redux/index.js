import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
  list: null,
};

export const listVendor = createAsyncThunk('listVendor', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  console.log(`rest/vendors/${payload.company}?token=${accessToken}`);

  const response = await axiosInstance.get(
    `rest/vendors/company/${payload.company}/?token=${accessToken}`
  );
  return response;
});

export const addVendor = createAsyncThunk('addVendor', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/vendors/?token=${accessToken}`, payload);
  return response;
});

export const getVendor = createAsyncThunk('getVendor', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/vendors/${payload.id}?token=${accessToken}`);
  return response;
});

export const deleteVendor = createAsyncThunk('deleteVendor', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/vendors/delete?token=${accessToken}`, payload);
  return response;
});

const vendorSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    clearData(state, action) {
      state.list = null;
    },
  },
  extraReducers: {
    [listVendor.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listVendor.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.list = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listVendor.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = vendorSlice.actions;
export default vendorSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios-instance';

const initialState = {
  list: null,
};

export const listPO = createAsyncThunk('listPO', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  console.log(`rest/clients/${payload.company}?token=${accessToken}`)

  const response = await axiosInstance.get(`rest/purchase-orders/company/${payload.company}/?token=${accessToken}`);
  return response;
});

export const addPO = createAsyncThunk('addPO', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/purchase-orders/?token=${accessToken}`, payload);
  return response;
});

export const deletePO = createAsyncThunk('deletePO', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/purchase-orders/delete?token=${accessToken}`, payload);
  return response;
});

export const getPO = createAsyncThunk('getPO', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/purchase-orders/${payload.id}?token=${accessToken}`
  );
  return response;
});

const purchaseOrderSlice = createSlice({
  name: 'purchaseOrders',
  initialState,
  reducers: {
    resetData(state, action) {
      state.list = null
    },
  },
  extraReducers: {
    [listPO.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listPO.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.list = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listPO.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default purchaseOrderSlice.reducer;

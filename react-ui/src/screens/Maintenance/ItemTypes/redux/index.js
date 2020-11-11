import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
  list: null,
};

export const listIT = createAsyncThunk('listIT', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/item-types?token=${accessToken}`);
  return response;
});

export const addIT = createAsyncThunk('addIT', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/item-types/?token=${accessToken}`, payload);
  return response;
});

export const deleteIT = createAsyncThunk('deleteIT', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/item-types/delete?token=${accessToken}`, payload);
  return response;
});

const itemTypeSlice = createSlice({
  name: 'itemTypes',
  initialState,
  reducers: {},
  extraReducers: {
    [listIT.pending]: (state) => {
      state.status = 'loading';
    },
    [listIT.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.list = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listIT.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export default itemTypeSlice.reducer;

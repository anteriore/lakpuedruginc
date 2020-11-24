import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
  list: null,
};

export const listS = createAsyncThunk('listS', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/sales-reps?token=${accessToken}`);
  return response;
});

export const addS = createAsyncThunk('addS', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/sales-reps/?token=${accessToken}`, payload);
  return response;
});

export const deleteS = createAsyncThunk('deleteS', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/sales-reps/delete?token=${accessToken}`, payload);
  return response;
});

const salesRepSlice = createSlice({
  name: 'salesReps',
  initialState,
  reducers: {},
  extraReducers: {
    [listS.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listS.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.list = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listS.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default salesRepSlice.reducer;

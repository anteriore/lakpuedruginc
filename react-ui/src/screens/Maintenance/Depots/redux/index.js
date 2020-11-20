import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
  list: null,
};

export const listDepot = createAsyncThunk('listDepot', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/depots?token=${accessToken}`);
  return response;
});

export const addDepot = createAsyncThunk('addDepot', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/depots/?token=${accessToken}`, payload);
  return response;
});

export const deleteDepot = createAsyncThunk('deleteDepot', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/depots/delete?token=${accessToken}`, payload);
  return response;
});

const depotSlice = createSlice({
  name: 'depots',
  initialState,
  reducers: {},
  extraReducers: {
    [listDepot.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listDepot.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.list = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listDepot.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default depotSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
  list: null,
};

export const listClient = createAsyncThunk('listClient', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  console.log(`rest/clients/${payload.company}?token=${accessToken}`);
  console.log(payload, 'Checking payload');
  const response = await axiosInstance.get(
    `rest/clients/company/${payload.company}/?token=${accessToken}`
  );
  return response;
});

export const addClient = createAsyncThunk('addClient', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/clients/?token=${accessToken}`, payload);
  return response;
});

export const deleteClient = createAsyncThunk('deleteClient', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/clients/delete?token=${accessToken}`, payload);
  return response;
});

export const getClient = createAsyncThunk('getClient', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/clients/${payload.id}?token=${accessToken}`);
  return response;
});

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clearData(state, action) {
      state.list = null;
    },
  },
  extraReducers: {
    [listClient.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listClient.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.list = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listClient.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = clientSlice.actions;
export default clientSlice.reducer;

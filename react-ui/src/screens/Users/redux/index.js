import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios-instance';

const initialState = {
  list: null,
};

export const listUser = createAsyncThunk('listUser', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/users/company/${payload.company}/?token=${accessToken}`);
  return response;
});

export const addUser = createAsyncThunk('addUser', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/users/?token=${accessToken}`, payload);
  return response;
});

export const deleteUser = createAsyncThunk('deleteUser', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/users/delete?token=${accessToken}`, payload);
  return response;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    resetData(state, action) {
      state.list = null
    },
  },
  extraReducers: {
    [listUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listUser.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.list = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listUser.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export default userSlice.reducer;

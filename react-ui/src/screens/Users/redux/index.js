import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios-instance';

const initialState = {
  listUser: null,
  listPermission: null,
};

export const listUser = createAsyncThunk('listUser', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/users/company/${payload.company}/?token=${accessToken}`
  );
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

export const listPermission = createAsyncThunk('listUser', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/permissions/?token=${accessToken}`);
  return response;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearData(state, action) {
      state.listUser = null;
      state.listPermission = null;
    },
  },
  extraReducers: {
    [listUser.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listUser.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.listUser = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listUser.rejected]: (state, action) => {
      state.status = 'failed';
    },

    [listPermission.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listPermission.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.listPermission = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listPermission.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = userSlice.actions;
export default userSlice.reducer;

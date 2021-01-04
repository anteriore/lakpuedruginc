import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../utils/axios-instance';
import * as message from '../../../data/constants/response-message.constant';

const initialState = {
  listUser: null,
  listPermission: null,
};

export const listUser = createAsyncThunk('listUser', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/users/company/${payload.company}/?token=${accessToken}`
  );
  
  if(typeof response !== 'undefined' && response.status === 200){
    const { data } = response;
    if( data.length === 0){
      payload.message.warning("No data retrieved for users")
    }
  }
  else {
    payload.message.error(message.ITEMS_GET_REJECTED)
  }

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

export const listPermission = createAsyncThunk('listPermission', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/permissions/?token=${accessToken}`);
  return response;
});

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearData: () => initialState
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

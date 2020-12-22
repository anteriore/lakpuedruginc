import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
  list: null,
};

export const listAC = createAsyncThunk('listAC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/account-codes?token=${accessToken}`);
  return response;
});

export const addAC = createAsyncThunk('addAC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/account-codes/?token=${accessToken}`, payload);
  return response;
});

export const deleteAC = createAsyncThunk('deleteAC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/account-codes/delete?token=${accessToken}`,
    payload
  );
  return response;
});

const accountCodeSlice = createSlice({
  name: 'accountCodes',
  initialState,
  reducers: {
    clearData(state) {
      state.list = null;
    },
  },
  extraReducers: {
    [listAC.pending]: (state) => {
      state.status = 'loading';
    },
    [listAC.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.list = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listAC.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = accountCodeSlice.actions;
export default accountCodeSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
  list: null,
};

export const listC = createAsyncThunk('listC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/classifications?token=${accessToken}`);
  return response;
});

export const addC = createAsyncThunk('addC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/classifications/?token=${accessToken}`, payload);
  return response;
});

export const deleteC = createAsyncThunk('deleteC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/classifications/delete?token=${accessToken}`,
    payload
  );
  return response;
});

const classificationSlice = createSlice({
  name: 'classification',
  initialState,
  reducers: {
    clearData(state, action) {
      state.list = null;
    },
  },
  extraReducers: {
    [listC.pending]: (state) => {
      state.status = 'loading';
    },
    [listC.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.list = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listC.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = classificationSlice.actions;
export default classificationSlice.reducer;

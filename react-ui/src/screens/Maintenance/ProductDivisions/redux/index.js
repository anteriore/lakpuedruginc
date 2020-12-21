import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
  list: null,
};

export const listPD = createAsyncThunk('listPD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/product-division-codes?token=${accessToken}`);
  return response;
});

export const addPD = createAsyncThunk('addPD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/product-division-codes/?token=${accessToken}`,
    payload
  );
  return response;
});

export const deletePD = createAsyncThunk('deletePD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/product-division-codes/delete?token=${accessToken}`,
    payload
  );
  return response;
});

const productDivisionSlice = createSlice({
  name: 'productDivisions',
  initialState,
  reducers: {
    clearData(state, action) {
      state.list = null;
    },
  },
  extraReducers: {
    [listPD.pending]: (state) => {
      state.status = 'loading';
    },
    [listPD.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.list = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listPD.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = productDivisionSlice.actions;
export default productDivisionSlice.reducer;

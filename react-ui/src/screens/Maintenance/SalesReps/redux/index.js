import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listS = createAsyncThunk('listS', async (payload, thunkAPI, rejectWithValue) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/sales-reps?token=${accessToken}`);

  if (typeof response !== 'undefined' && response.status === 200) {
    const { data } = response;
    if (data.length === 0) {
      payload.message.warning('No data retrieved for sales reps');
    }
  } else {
    payload.message.error(message.ITEMS_GET_REJECTED);
    return rejectWithValue(response);
  }

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
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listS.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listS.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for sales reps';
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listS.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = salesRepSlice.actions;
export default salesRepSlice.reducer;

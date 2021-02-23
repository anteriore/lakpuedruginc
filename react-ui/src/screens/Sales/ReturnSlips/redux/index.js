import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listReturnSlip = createAsyncThunk('listReturnSlip', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/return-slips?token=${accessToken}`);

  if (typeof response !== 'undefined' && response.status === 200) {
    const { data } = response;
    if (data.length === 0) {
      payload.message.warning('No data retrieved for return slips');
    }
  } else {
    payload.message.error(message.ITEMS_GET_REJECTED);
    return thunkAPI.rejectWithValue(response);
  }

  return response;
});

export const addReturnSlip = createAsyncThunk('addReturnSlip', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/return-slips/?token=${accessToken}`, payload);
  return response;
});

export const deleteReturnSlip = createAsyncThunk('deleteReturnSlip', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/return-slips/delete?token=${accessToken}`,
    payload
  );
  return response;
});

const returnSlipSlice = createSlice({
  name: 'returnSlips',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listReturnSlip.pending]: (state) => {
      state.status = 'loading';
    },
    [listReturnSlip.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for return slips';
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listReturnSlip.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = returnSlipSlice.actions;
export default returnSlipSlice.reducer;

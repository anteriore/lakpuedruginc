import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listApprovedReceipts = createAsyncThunk('listApprovedReceipts', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  let { company, fnCallback } = payload;
  if (typeof fnCallback === 'undefined') {
    fnCallback = () => {};
  }
  const response = await axiosInstance.get(`rest/approved-receipts/company/${company}?token=${accessToken}`);

  if (typeof response !== 'undefined') {
    const { status } = response;
    if (status === 200) {
      if (response.data.length === 0) {
        response.statusText = `${message.API_200_EMPTY} in approved receipts`;
      } else {
        response.statusText = `${message.API_200_SUCCESS} in approved receipts`;
      }
      fnCallback(response);
      return response;
    }

    if (status === 500 || status === 400) {
      fnCallback(response);
      return thunkAPI.rejectWithValue(response);
    }
  } else {
    const newReponse = {
      status: 500,
      statusText: message.API_UNDEFINED,
    };
    fnCallback(newReponse);
    return thunkAPI.rejectWithValue(response);
  }
});

export const addApprovedReceipt = createAsyncThunk('addApprovedReceipt', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/approved-receipts/?token=${accessToken}`, payload);
  return response;
});

export const deleteApprovedReceipt = createAsyncThunk('deleteApprovedReceipt', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/approved-receipts/delete?token=${accessToken}`, payload);
  return response;
});

export const getApprovedReceipt = createAsyncThunk('getApprovedReceipt', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/approved-receipts/${payload.id}?token=${accessToken}`);
  return response;
});

const approvedReceiptSlice = createSlice({
  name: 'approvedReceipts',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listApprovedReceipts.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listApprovedReceipts.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for approved receipts';
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listApprovedReceipts.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = approvedReceiptSlice.actions;
export default approvedReceiptSlice.reducer;

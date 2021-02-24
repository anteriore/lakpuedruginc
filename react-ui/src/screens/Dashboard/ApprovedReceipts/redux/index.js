import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import {checkResponseValidity} from '../../../../helpers/general-helper';

const initialState = {
  list: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listApprovedReceipts = createAsyncThunk('listApprovedReceipts', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try{
    const response = await axiosInstance.get(
      `/rest/approved-receipts/company/${payload.company}?token=${accessToken}`
    )

    const { response: validatedResponse, valid } = checkResponseValidity(response);
    
    if(valid) {
      return validatedResponse;
    }

    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
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

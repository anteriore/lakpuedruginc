import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listRR = createAsyncThunk('listRR', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company, fnCallback } = payload;
  const response = await axiosInstance.get(
    `/rest/receiving-receipts/company/${company}?token=${accessToken}`
  );

  if (typeof response !== 'undefined') {
    const { status } = response;
    if (status === 200) {
      if (response.data.length === 0) {
        response.statusText = `${message.API_200_EMPTY} in receiving receipts.`;
      } else {
        response.statusText = `${message.API_200_SUCCESS} in receiving receipts.`;
      }
      fnCallback(response);
      return response;
    }

    if (status === 500 || status === 400) {
      fnCallback(response);
      return thunkAPI.rejectWithValue(response);
    }
  } else {
    return thunkAPI.rejectWithValue(response);
  }

  return response;
});

export const addRR = createAsyncThunk('addRR', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/receiving-receipts?token=${accessToken}`, payload);

  return response;
});

export const updateRR = createAsyncThunk('updateRR', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/receiving-receipts?token=${accessToken}`, payload);

  return response;
});

export const deleteRR = createAsyncThunk('deleteRR', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { id } = payload;
  const response = await axiosInstance.post(`/rest/receiving-receipts/delete?token=${accessToken}`, id);

  return response;
});

export const getRR = createAsyncThunk('getRR', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/receiving-receipts/${payload.id}?token=${accessToken}`
  );
  return response;
});

export const listRRByStatus = createAsyncThunk(
    'listRRByStatus',
    async (payload, thunkAPI, rejectWithValue) => {
      const accessToken = thunkAPI.getState().auth.token;
  
      const response = await axiosInstance.get(
        `rest/receiving-receipts/company/${payload.company}/status/${payload.status}?token=${accessToken}`
      );
  
      if (typeof response !== 'undefined' && response.status === 200) {
        const { data } = response;
        if (data.length === 0) {
          payload.message.warning('No data retrieved for receiving receipts');
        }
      } else {
        payload.message.error(message.ITEMS_GET_REJECTED);
        return rejectWithValue(response);
      }
  
    return response;
});

export const listRRByPO = createAsyncThunk(
    'listRRByPO',
    async (payload, thunkAPI, rejectWithValue) => {
      const accessToken = thunkAPI.getState().auth.token;
  
      const response = await axiosInstance.get(
        `rest/receiving-receipts/company/${payload.company}/po/${payload.poID}?token=${accessToken}`
      );
  
      if (typeof response !== 'undefined' && response.status === 200) {
        const { data } = response;
        if (data.length === 0) {
          payload.message.warning('No data retrieved for receiving receipts');
        }
      } else {
        payload.message.error(message.ITEMS_GET_REJECTED);
        return rejectWithValue(response);
      }
      
      return response;
});

const receivingReceiptsSlice = createSlice({
  name: 'receivingReceipts',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listRR.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listRR.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for receiving receipts';
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listRR.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = receivingReceiptsSlice.actions;
export default receivingReceiptsSlice.reducer;

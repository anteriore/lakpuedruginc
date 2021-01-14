import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listAReceipt = createAsyncThunk('listAReceipt', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.get(`rest/acknowledgement-receipts?token=${accessToken}`);
  
    if(typeof response !== 'undefined' && response.status === 200){
      const { data } = response;
      if( data.length === 0){
        payload.message.warning("No data retrieved for acknowledgement receipts")
      }
    }
    else {
      payload.message.error(message.ITEMS_GET_REJECTED)
      return thunkAPI.rejectWithValue(response)
    }
  
    return response;
  }
);

export const addAReceipt = createAsyncThunk(
  'addAReceipt',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/acknowledgement-receipts/?token=${accessToken}`,
      payload
    );
    return response;
  }
);

export const deleteAReceipt = createAsyncThunk(
  'deleteAReceipt',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/acknowledgement-receipts/delete?token=${accessToken}`,
      payload
    );
    return response;
  }
);

const acknowledgementReceiptSlice = createSlice({
  name: 'acknowledgementReceipts',
  initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listAReceipt.pending]: (state) => {
      state.status = 'loading';
    },
    [listAReceipt.fulfilled]: (state, action) => {
      const { data } = action.payload;
      var statusMessage = message.ITEMS_GET_FULFILLED

      if( data.length === 0){
        statusMessage = "No data retrieved for acknowledgement receipts"
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage: statusMessage,
      };
    },
    [listAReceipt.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = acknowledgementReceiptSlice.actions;
export default acknowledgementReceiptSlice.reducer;

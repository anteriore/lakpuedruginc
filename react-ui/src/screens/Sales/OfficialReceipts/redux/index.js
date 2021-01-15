import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listOReceipt = createAsyncThunk('listOReceipt', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.get(`rest/order-receipts?token=${accessToken}`);
  
    if(typeof response !== 'undefined' && response.status === 200){
      const { data } = response;
      if( data.length === 0){
        payload.message.warning("No data retrieved for official receipts")
      }
    }
    else {
      payload.message.error(message.ITEMS_GET_REJECTED)
      return thunkAPI.rejectWithValue(response)
    }
  
    return response;
  }
);

export const addOReceipt = createAsyncThunk(
  'addOReceipt',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/order-receipts/?token=${accessToken}`,
      payload
    );
    return response;
  }
);

export const deleteOReceipt = createAsyncThunk(
  'deleteOReceipt',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/order-receipts/delete?token=${accessToken}`,
      payload
    );
    return response;
  }
);

const officialReceiptSlice = createSlice({
  name: 'officialReceipts',
  initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listOReceipt.pending]: (state) => {
      state.status = 'loading';
    },
    [listOReceipt.fulfilled]: (state, action) => {
      const { data } = action.payload;
      var statusMessage = message.ITEMS_GET_FULFILLED

      if( data.length === 0){
        statusMessage = "No data retrieved for official receipts"
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage: statusMessage,
      };
    },
    [listOReceipt.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = officialReceiptSlice.actions;
export default officialReceiptSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listCashReceiptVoucher = createAsyncThunk(
  'listCashReceiptVoucher',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    try {
      const response = await axiosInstance.get(`rest/cash-receipt-vouchers?token=${accessToken}`);
      const { response: validatedResponse, valid } = checkResponseValidity(response);

      if (valid) {
        return validatedResponse;
      }
      return thunkAPI.rejectWithValue(validatedResponse);
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: null,
        data: null,
        statusText: 'failed. An error has occurred'
      });
    }

  }
);

export const addCashReceiptVoucher = createAsyncThunk(
  'addCashReceiptVoucher',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    try {
      const response = await axiosInstance.post(
        `rest/cash-receipt-vouchers/?token=${accessToken}`,
        payload
      );
      const { response: validatedResponse, valid } = checkResponseValidity(response);

      if (valid) {
        return validatedResponse;
      }
      return thunkAPI.rejectWithValue(validatedResponse);
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: null,
        data: null,
        statusText: 'failed. An error has occurred'
      });
    }
  }
);

export const deleteCashReceiptVoucher = createAsyncThunk(
  'deleteCashReceiptVoucher',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    try {
      const response = await axiosInstance.post(
        `rest/cash-receipt-vouchers/delete?token=${accessToken}`,
        payload
      );
      const { response: validatedResponse, valid } = checkResponseValidity(response);

      if (valid) {
        return validatedResponse;
      }
      return thunkAPI.rejectWithValue(validatedResponse);
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: null,
        data: null,
        statusText: 'failed. An error has occurred'
      });
    }
  }
);

const cashReceiptVoucherSlice = createSlice({
  name: 'cashReceiptVouchers',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listCashReceiptVoucher.pending]: (state) => {
      return { 
        ...state,  
        action: 'fetch', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Cash Receipt Vouchers` 
      };
    },
    [listCashReceiptVoucher.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cash Receipt Vouchers', state.action);

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [listCashReceiptVoucher.rejected]: (state, action) => {
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Cash Receipt Vouchers',
        state.action
      );

      return {
        ...state,
        data: [],
        status: 'failed',
        statusLevel: level,
        responseCode: null,
        statusMessage,
      };
    },
    [addCashReceiptVoucher.pending]: (state) => {
      return { 
        ...state,  
        action: 'create', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Cash Receipt Vouchers` 
      };
    },
    [addCashReceiptVoucher.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cash Receipt Vouchers', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [addCashReceiptVoucher.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Cash Receipt Vouchers',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [deleteCashReceiptVoucher.pending]: (state) => {
      return { 
        ...state,  
        action: 'delete', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Cash Receipt Vouchers` 
      };
    },
    [deleteCashReceiptVoucher.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cash Receipt Vouchers', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [deleteCashReceiptVoucher.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Cash Receipt Vouchers',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
  },
});

export const { clearData } = cashReceiptVoucherSlice.actions;
export default cashReceiptVoucherSlice.reducer;

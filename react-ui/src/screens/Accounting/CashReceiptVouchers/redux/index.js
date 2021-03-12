import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: null,
  status: '',
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
      return thunkAPI.rejectWithValue(err.response.data);
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
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const deleteCashReceiptVoucher = createAsyncThunk(
  'deleteCashReceiptVoucher',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/cash-receipt-vouchers/delete?token=${accessToken}`,
      payload
    );
    return response;
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
      state.status = 'loading';
    },
    [listCashReceiptVoucher.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cash Receipt Vouchers');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listCashReceiptVoucher.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = cashReceiptVoucherSlice.actions;
export default cashReceiptVoucherSlice.reducer;

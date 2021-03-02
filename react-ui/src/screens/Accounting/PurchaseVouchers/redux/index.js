import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

export const listPurchaseVouchers = createAsyncThunk('listPurchaseVouchers', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(
      `/rest/purchase-vouchers/company/${payload}?token=${accessToken}`
    );

    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const initialState = {
  list: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

const purchaseVouchersSlice = createSlice({
  name: 'purchaseVouchers',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listPurchaseVouchers.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for purchase vouchers`,
      };
    },
    [listPurchaseVouchers.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Purchase Vouchers'
      );

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [listPurchaseVouchers.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Purchase Vouchers'
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage,
      };
    }
  },
});

export const { clearData } = purchaseVouchersSlice.actions;
export default purchaseVouchersSlice.reducer;
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

export const listVoucherByCompany = createAsyncThunk(
  'listVoucherByCompany',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { company } = payload;
    try {
      const response = await axiosInstance.get(
        `/rest/vouchers/company/${company}/new-vouchers?token=${accessToken}`
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

export const listVoucherByCompanyAndStatus = createAsyncThunk(
  'listVoucherByCompanyAndStatus',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const { company, status } = payload;

    try {
      const response = await axiosInstance.get(
        `rest/vouchers/company/${company}/status/${status}/new-vouchers?token=${accessToken}`
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

const vouchersSlice = createSlice({
  name: 'vouchers',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listVoucherByCompany.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for vouchers`,
      };
    },
    [listVoucherByCompany.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(action.payload, 'Vouchers');

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [listVoucherByCompany.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(action.payload, 'Vouchers');

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage,
      };
    },
    [listVoucherByCompanyAndStatus.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for vouchers`,
      };
    },
    [listVoucherByCompanyAndStatus.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(action.payload, 'Vouchers');

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [listVoucherByCompanyAndStatus.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(action.payload, 'Vouchers');

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage,
      };
    },
  },
});

export const { clearData } = vouchersSlice.actions;
export default vouchersSlice.reducer;

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

const voucherSlice = createSlice({
  name: 'vouchers',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listVoucherByCompanyAndStatus.pending]: (state) => {
      state.status = 'loading';
    },
    [listVoucherByCompanyAndStatus.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Vouchers');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listVoucherByCompanyAndStatus.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = voucherSlice.actions;
export default voucherSlice.reducer;

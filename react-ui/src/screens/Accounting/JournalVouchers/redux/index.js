import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

export const listJournalVouchers = createAsyncThunk('listJournalVouchers', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company } = payload
  try {
    const response = await axiosInstance.get(
      `/rest/journal-vouchers/company/${company}?token=${accessToken}`
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
});

export const listJournalVouchersByVendorWithoutAdjustent = createAsyncThunk('listJournalVouchersByVendorWithoutAdjustent', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company, vendor, status } = payload
  try {
    const response = await axiosInstance.get(
      `/rest/journal-vouchers/company/${company}/vendor/${vendor}/status/${status}/journal-vouchers-no-adjustment?token=${accessToken}`
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
});

export const createJournalVouchers = createAsyncThunk('createJournalVouchers', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(
      `/rest/journal-vouchers?token=${accessToken}`,
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
})

export const approveJournalVouchers = createAsyncThunk('approveJournalVouchers', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(
      `/rest/journal-vouchers/approve/${payload.jvId}/user/${payload.user}?token=${accessToken}`
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
});

export const rejectJournalVouchers = createAsyncThunk('rejectJournalVouchers', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(
      `/rest/journal-vouchers/reject/${payload.jvId}/user/${payload.user}?token=${accessToken}`
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
});

const initialState = {
  list: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

const journalVouchersSlice = createSlice({
  name: 'journalVouchers',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listJournalVouchers.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for journal vouchers`,
      };
    },
    [listJournalVouchers.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Journal Vouchers',
        state.action
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
    [listJournalVouchers.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Journal Vouchers',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage,
      };
    },
    [listJournalVouchersByVendorWithoutAdjustent.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for journal vouchers`,
      };
    },
    [listJournalVouchersByVendorWithoutAdjustent.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Journal Vouchers'
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
    [listJournalVouchersByVendorWithoutAdjustent.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Journal Vouchers',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage,
      };
    },
    [createJournalVouchers.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEM_ADD_PENDING} for journal vouchers`,
        responseCode: null,
      };
    },
    [createJournalVouchers.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Journal Vouchers',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [createJournalVouchers.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Journal Vouchers',
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
    [approveJournalVouchers.pending]: (state) => {
      return {
        ...state,
        action: 'approving',
        status: 'loading',
        statusLevel: '',
        statusMessage: `Approving selected journal voucher`,
        responseCode: null,
      };
    },
    [approveJournalVouchers.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Journal Vouchers',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [approveJournalVouchers.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Journal Vouchers',
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
    [rejectJournalVouchers.pending]: (state) => {
      return {
        ...state,
        action: 'rejecting',
        status: 'loading',
        statusLevel: '',
        statusMessage: `Reject selected journal voucher`,
        responseCode: null,
      };
    },
    [rejectJournalVouchers.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Journal Vouchers',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [rejectJournalVouchers.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Journal Vouchers'
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
  }
});

export const {clearData} = journalVouchersSlice.actions;
export default journalVouchersSlice.reducer;
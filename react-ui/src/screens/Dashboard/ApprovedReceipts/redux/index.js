import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  approvedReceiptsList: null,
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listApprovedReceipts = createAsyncThunk(
  'listApprovedReceipts',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { company } = payload
    try {
      const response = await axiosInstance.get(
        `/rest/approved-receipts/company/${company}?token=${accessToken}`
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

export const addApprovedReceipt = createAsyncThunk(
  'addApprovedReceipt',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/approved-receipts/?token=${accessToken}`,
      payload
    );
    return response;
  }
);

export const deleteApprovedReceipt = createAsyncThunk(
  'deleteApprovedReceipt',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/approved-receipts/delete?token=${accessToken}`,
      payload
    );
    return response;
  }
);

export const getApprovedReceipt = createAsyncThunk(
  'getApprovedReceipt',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.get(
      `rest/approved-receipts/${payload.id}?token=${accessToken}`
    );
    return response;
  }
);

const approvedReceiptSlice = createSlice({
  name: 'approvedReceipts',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listApprovedReceipts.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for approved receipts`,
      };
    },
    [listApprovedReceipts.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Approved Receipts'
      );

      return {
        ...state,
        approvedReceiptsList: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [listApprovedReceipts.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Approved Receipts'
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
  },
});

export const { clearData } = approvedReceiptSlice.actions;
export default approvedReceiptSlice.reducer;

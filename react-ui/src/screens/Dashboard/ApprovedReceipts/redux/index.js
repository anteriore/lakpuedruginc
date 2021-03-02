import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import {checkResponseValidity, generateStatusMessage} from '../../../../helpers/general-helper';

const initialState = {
  approvedReceiptsList: null,
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listApprovedReceipts = createAsyncThunk('listApprovedReceipts', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/approved-receipts/company/${payload.company}?token=${accessToken}`
  );

  if (typeof response !== 'undefined' && response.status === 200) {
    const { data } = response;
    if (data.length === 0) {
      payload.message.warning('No data retrieved for approved receipts');
    }
  } else {
    payload.message.error(message.ITEMS_GET_REJECTED);
    return thunkAPI.rejectWithValue(response);
  }

  return response;
});

export const addApprovedReceipt = createAsyncThunk(
  'addApprovedReceipt',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.post(`/rest/approved-receipts?token=${accessToken}`, payload );

    const { response: validateResponse, valid } = checkResponseValidity(response);
    if (valid) {
      return validateResponse;
    }
    return thunkAPI.rejectWithValue(validateResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

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
        statusMessage: `${message.ITEMS_GET_PENDING} for approved receipts`
      }
    },
    [listApprovedReceipts.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const {message: statusMessage, level} = generateStatusMessage(action.payload, 'Product Movement');

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage
      }
    },
    [listApprovedReceipts.rejected]: (state, action) => {
      const {status} = action.payload;
      const {message: statusMessage, level} = generateStatusMessage(action.payload, 'Product Movement');

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage
      }
    },
    [addApprovedReceipt.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusMessage: `${message.ITEM_ADD_PENDING} for approved receipts`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [addApprovedReceipt.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Approved Receipts'
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [addApprovedReceipt.rejected]: (state, action) => {
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
        statusMessage,
      };
    },
  },
});

export const { clearData } = approvedReceiptSlice.actions;
export default approvedReceiptSlice.reducer;

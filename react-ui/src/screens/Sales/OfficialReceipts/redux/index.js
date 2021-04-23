import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listOReceipt = createAsyncThunk('listOReceipt', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.get(`rest/order-receipts?token=${accessToken}`);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: message.ERROR_OCCURED,
    });
  }
});

export const addOReceipt = createAsyncThunk('addOReceipt', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`rest/order-receipts/?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: message.ERROR_OCCURED,
    });
  }
});

export const deleteOReceipt = createAsyncThunk('deleteOReceipt', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(
      `rest/order-receipts/delete?token=${accessToken}`,
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
      statusText: message.ERROR_OCCURED,
    });
  }
});

const officialReceiptSlice = createSlice({
  name: 'officialReceipts',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listOReceipt.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for official receipts`,
      };
    },
    [listOReceipt.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Official Receipts',
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
    [listOReceipt.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Official Receipts',
        state.action
      );

      return {
        ...state,
        list: [],
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },

    [addOReceipt.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusMessage: `${message.ITEM_ADD_PENDING} for official receipt`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [addOReceipt.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Official Reciepts',
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
    [addOReceipt.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Official Reciepts',
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

export const { clearData } = officialReceiptSlice.actions;
export default officialReceiptSlice.reducer;

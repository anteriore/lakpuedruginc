import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

export const listJobOrders = createAsyncThunk('listJobOrders', async (_, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(`/rest/job-orders?token=${accessToken}`);

    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: message.ERROR_OCCURED
    });
  }
});

export const createJobOrder = createAsyncThunk('createJobOrder', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.post(`/rest/job-orders?token=${accessToken}`, payload);

    const { response: validateResponse, valid } = checkResponseValidity(response);
    if (valid) {
      return validateResponse;
    }
    return thunkAPI.rejectWithValue(validateResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: message.ERROR_OCCURED
    });
  }
});

const initialState = {
  jobOrderList: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

const jobOrderSlice = createSlice({
  name: 'jobOrders',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listJobOrders.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for job orders`,
      };
    },
    [listJobOrders.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(action.payload, 'Job Orders', state.action);

      return {
        ...state,
        jobOrderList: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [listJobOrders.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(action.payload, 'Job Orders', state.action);

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage,
      };
    },
    [createJobOrder.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusMessage: `${message.ITEM_ADD_PENDING} for job order`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [createJobOrder.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(action.payload, 'Job Order', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [createJobOrder.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(action.payload, 'Job Order', state.action);

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

export const { clearData } = jobOrderSlice.actions;
export default jobOrderSlice.reducer;

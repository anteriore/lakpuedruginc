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

export const listPDCDisbursement = createAsyncThunk(
  'listPDCDisbursement',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    try {
      const response = await axiosInstance.get(`rest/pdc-disbursements?token=${accessToken}`);

      const { response: validatedResponse, valid } = checkResponseValidity(response);

      if (valid) {
        return validatedResponse;
      }
      return thunkAPI.rejectWithValue(validatedResponse);
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: null,
        data: null,
        statusText: 'failed. An error has occurred',
      });
    }
  }
);

export const listPDCDisbursementByStatus = createAsyncThunk(
  'listPDCDisbursementByStatus',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { status } = payload;

    try {
      const response = await axiosInstance.get(
        `rest/pdc-disbursements/status/${status}?token=${accessToken}`
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
        statusText: 'failed. An error has occurred',
      });
    }
  }
);

export const addPDCDisbursement = createAsyncThunk(
  'addPDCDisbursement',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    try {
      const response = await axiosInstance.post(
        `rest/pdc-disbursements/?token=${accessToken}`,
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
        statusText: 'failed. An error has occurred',
      });
    }
  }
);

export const updatePDCDisbursement = createAsyncThunk(
  'updatePDCDisbursement',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    try {
      const response = await axiosInstance.post(
        `rest/pdc-disbursements/?token=${accessToken}`,
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
        statusText: 'failed. An error has occurred',
      });
    }
  }
);

export const deletePDCDisbursement = createAsyncThunk(
  'deletePDCDisbursement',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    try {
      const response = await axiosInstance.post(
        `rest/pdc-disbursements/delete?token=${accessToken}`,
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
        statusText: 'failed. An error has occurred',
      });
    }
  }
);

const PDCDisbursementSlice = createSlice({
  name: 'PDCDisbursements',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listPDCDisbursement.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for PDC Disbursements`,
      };
    },
    [listPDCDisbursement.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(
        action.payload,
        'PDC Disbursements',
        state.action
      );

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [listPDCDisbursement.rejected]: (state, action) => {
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'PDC Disbursements',
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
    [listPDCDisbursementByStatus.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for PDC Disbursements`,
      };
    },
    [listPDCDisbursementByStatus.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(
        action.payload,
        'PDC Disbursements',
        state.action
      );

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [listPDCDisbursementByStatus.rejected]: (state, action) => {
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'PDC Disbursements',
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
    [addPDCDisbursement.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for PDC Disbursements`,
      };
    },
    [addPDCDisbursement.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(
        action.payload,
        'PDC Disbursements',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [addPDCDisbursement.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'PDC Disbursements',
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
    [updatePDCDisbursement.pending]: (state) => {
      return {
        ...state,
        action: 'update',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for PDC Disbursements`,
      };
    },
    [updatePDCDisbursement.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(
        action.payload,
        'PDC Disbursements',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [updatePDCDisbursement.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'PDC Disbursements',
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
    [deletePDCDisbursement.pending]: (state) => {
      return {
        ...state,
        action: 'delete',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for PDC Disbursements`,
      };
    },
    [deletePDCDisbursement.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(
        action.payload,
        'PDC Disbursements',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [deletePDCDisbursement.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'PDC Disbursements',
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

export const { clearData } = PDCDisbursementSlice.actions;
export default PDCDisbursementSlice.reducer;

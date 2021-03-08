import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listPDCDisbursement = createAsyncThunk(
  'listPDCDisbursement',
  async (payload, thunkAPI, rejectWithValue) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.get(`rest/pdc-disbursements?token=${accessToken}`);

    if (typeof response !== 'undefined' && response.status === 200) {
      const { data } = response;
      if (data.length === 0) {
        payload.message.warning('No data retrieved for PDC disbursements');
      }
    } else {
      payload.message.error(message.ITEMS_GET_REJECTED);
      return rejectWithValue(response);
    }

    return response;
  }
);

export const listPDCDisbursementByStatus = createAsyncThunk(
  'listPDCDisbursementByStatus',
  async (payload, thunkAPI, rejectWithValue) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { status } = payload;

    const response = await axiosInstance.get(`rest/pdc-disbursements/status/${status}?token=${accessToken}`);

    if (typeof response !== 'undefined' && response.status === 200) {
      const { data } = response;
      if (data.length === 0) {
        payload.message.warning('No data retrieved for PDC disbursements');
      }
    } else {
      payload.message.error(message.ITEMS_GET_REJECTED);
      return rejectWithValue(response);
    }

    return response;
  }
);

export const addPDCDisbursement = createAsyncThunk(
  'addPDCDisbursement',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/pdc-disbursements/?token=${accessToken}`,
      payload
    );
    return response;
  }
);

export const deletePDCDisbursement = createAsyncThunk(
  'deletePDCDisbursement',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/pdc-disbursements/delete?token=${accessToken}`,
      payload
    );
    return response;
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
      state.status = 'loading';
    },
    [listPDCDisbursement.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for PDC Disbursements';
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listPDCDisbursement.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listPDCDisbursementByStatus.pending]: (state) => {
      state.status = 'loading';
    },
    [listPDCDisbursementByStatus.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for PDC Disbursements';
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listPDCDisbursementByStatus.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = PDCDisbursementSlice.actions;
export default PDCDisbursementSlice.reducer;

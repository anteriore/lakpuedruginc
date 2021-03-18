import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: [],
  status: '',
  statusMessage: '',
  action: '',
};

export const listChequePrinting = createAsyncThunk(
  'listChequePrinting',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { company } = payload;

    try {
      const response = await axiosInstance.get(
        `rest/cheque-printings/company/${company}?token=${accessToken}`
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

export const listChequePrintingByCompanyAndStatus = createAsyncThunk(
  'listChequePrintingByCompanyAndStatus',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { company, status } = payload;

    try {
      const response = await axiosInstance.get(
        `rest/cheque-printings/company/${company}/status/${status}?token=${accessToken}`
export const approveChequePrinting = createAsyncThunk(
  'approveChequePrinting',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { id, user } = payload;

    try {
      const response = await axiosInstance.post(
        `rest/cheque-printings/approve/${id}/user/${user}?token=${accessToken}`
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

export const rejectChequePrinting = createAsyncThunk(
  'rejectChequePrinting',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { id, user } = payload;

    try {
      const response = await axiosInstance.post(
        `rest/cheque-printings/reject/${id}/user/${user}?token=${accessToken}`
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

export const addChequePrinting = createAsyncThunk(
  'addChequePrinting',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    try {
      const response = await axiosInstance.post(
        `rest/cheque-printings/?token=${accessToken}`,
        payload
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

export const deleteChequePrinting = createAsyncThunk(
  'deleteChequePrinting',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/cheque-printings/delete?token=${accessToken}`,
      payload
    );
    return response;
  }
);

const chequePrintingSlice = createSlice({
  name: 'chequePrintings',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listChequePrinting.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listChequePrinting.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cheque Voucher');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listChequePrinting.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listChequePrintingByCompanyAndStatus.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listChequePrintingByCompanyAndStatus.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cheque Printings');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listChequePrintingByCompanyAndStatus.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = chequePrintingSlice.actions;
export default chequePrintingSlice.reducer;

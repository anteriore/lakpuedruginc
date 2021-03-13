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

export const listChequeDisbursement = createAsyncThunk(
  'listChequeDisbursement',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { company } = payload;

    try {
      const response = await axiosInstance.get(
        `rest/cheque-disbursements/company/${company}?token=${accessToken}`
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

export const addChequeDisbursement = createAsyncThunk(
  'addChequeDisbursement',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    try {
      const response = await axiosInstance.post(
        `rest/cheque-disbursements/?token=${accessToken}`,
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

export const deleteChequeDisbursement = createAsyncThunk(
  'deleteChequeDisbursement',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/cheque-disbursements/delete?token=${accessToken}`,
      payload
    );
    return response;
  }
);

const chequeDisbursementSlice = createSlice({
  name: 'chequeDisbursements',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listChequeDisbursement.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listChequeDisbursement.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cheque Disbursement Vouchers');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listChequeDisbursement.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = chequeDisbursementSlice.actions;
export default chequeDisbursementSlice.reducer;

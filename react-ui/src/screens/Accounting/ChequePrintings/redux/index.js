import { createSlice, createAsyncThunk, isRejected } from '@reduxjs/toolkit';

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
      return thunkAPI.rejectWithValue({
        status: null,
        data: null,
        statusText: 'failed. An error has occurred'
      });
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
  }
);


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
      return thunkAPI.rejectWithValue({
        status: null,
        data: null,
        statusText: 'failed. An error has occurred'
      });
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
      return thunkAPI.rejectWithValue({
        status: null,
        data: null,
        statusText: 'failed. An error has occurred'
      });
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
      return thunkAPI.rejectWithValue({
        status: null,
        data: null,
        statusText: 'failed. An error has occurred'
      });
    }

  }
);

export const deleteChequePrinting = createAsyncThunk(
  'deleteChequePrinting',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    try {
      const response = await axiosInstance.post(
        `rest/cheque-printings/delete?token=${accessToken}`,
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
  }
);

const chequePrintingSlice = createSlice({
  name: 'chequePrintings',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listChequePrinting.pending]: (state) => {
      return { 
        ...state,  
        action: 'fetch', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Cheque Vouchers` 
      };
    },
    [listChequePrinting.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cheque Vouchers', state.action);

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [listChequePrinting.rejected]: (state, action) => {
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Cheque Vouchers',
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
    [listChequePrintingByCompanyAndStatus.pending]: (state) => {
      return { 
        ...state,  
        action: 'fetch', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Cheque Vouchers` 
      };
    },
    [listChequePrintingByCompanyAndStatus.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cheque Vouchers', state.action);

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [listChequePrintingByCompanyAndStatus.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Cheque Vouchers',
        state.action
      );

      return {
        ...state,
        data: [],
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [addChequePrinting.pending]: (state) => {
      return { 
        ...state,  
        action: 'create', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Cheque Vouchers` 
      };
    },
    [addChequePrinting.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cheque Vouchers', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [addChequePrinting.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Cheque Vouchers',
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
    [approveChequePrinting.pending]: (state) => {
      return { 
        ...state,  
        action: 'approve', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Cheque Vouchers` 
      };
    },
    [approveChequePrinting.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cheque Vouchers', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [approveChequePrinting.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Cheque Vouchers',
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
    [rejectChequePrinting.pending]: (state) => {
      return { 
        ...state,  
        action: 'reject', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Cheque Vouchers` 
      };
    },
    [rejectChequePrinting.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cheque Vouchers', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [rejectChequePrinting.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Cheque Vouchers',
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
    [deleteChequePrinting.pending]: (state) => {
      return { 
        ...state,  
        action: 'delete', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Cheque Vouchers` 
      };
    },
    [deleteChequePrinting.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cheque Vouchers', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [deleteChequePrinting.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Cheque Vouchers',
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

export const { clearData } = chequePrintingSlice.actions;
export default chequePrintingSlice.reducer;

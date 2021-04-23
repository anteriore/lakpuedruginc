import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: [],
  status: 'loading',
  statusLevel: '',
  statusMessage: '',
  responseCode: null,
  action: '',
};

export const listMaterialReceiving = createAsyncThunk(
  'listMaterialReceiving',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { company } = payload;

    try {
      const response = await axiosInstance.get(
        `rest/material-receivings/company/${company}?token=${accessToken}`
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
  }
);

export const addMaterialReceiving = createAsyncThunk(
  'addMaterialReceiving',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    try {
      const response = await axiosInstance.post(
        `rest/material-receivings/?token=${accessToken}`,
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
  }
);

export const deleteMaterialReceiving = createAsyncThunk(
  'deleteMaterialReceiving',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    try {
      const response = await axiosInstance.post(
        `rest/material-receivings/delete?token=${accessToken}`,
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
  }
);

const materialReceivingSlice = createSlice({
  name: 'materialReceivings',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listMaterialReceiving.pending]: (state, action) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for material receivings`,
      };
    },
    [listMaterialReceiving.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(
        action.payload,
        'Material Receiving Slips',
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
    [listMaterialReceiving.rejected]: (state, action) => {
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Material Receiving Slips',
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
    [addMaterialReceiving.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEM_ADD_PENDING} for material receiving`,
      };
    },
    [addMaterialReceiving.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(
        action.payload,
        'Material Receiving Slips',
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
    [addMaterialReceiving.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Material Receiving Slips',
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

export const { clearData } = materialReceivingSlice.actions;
export default materialReceivingSlice.reducer;

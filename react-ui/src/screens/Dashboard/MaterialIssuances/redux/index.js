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

export const listMaterialIssuance = createAsyncThunk(
  'listMaterialIssuance',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { company } = payload;

    try {
      const response = await axiosInstance.get(
        `rest/material-issuances/company/${company}?token=${accessToken}`
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

export const listMaterialIssuanceByStatus = createAsyncThunk(
  'listMaterialIssuanceByStatus',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { status } = payload;

    try {
      const response = await axiosInstance.get(
        `rest/material-issuances/status/${status}?token=${accessToken}`
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

export const addMaterialIssuance = createAsyncThunk(
  'addMaterialIssuance',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/material-issuances/?token=${accessToken}`,
      payload
    );
    return response;
  }
);

export const deleteMaterialIssuance = createAsyncThunk(
  'deleteMaterialIssuance',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/material-issuances/delete?token=${accessToken}`,
      payload
    );
    return response;
  }
);

const materialIssuanceSlice = createSlice({
  name: 'materialIssuances',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listMaterialIssuance.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listMaterialIssuance.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Material Issuance Slips');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listMaterialIssuance.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listMaterialIssuanceByStatus.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listMaterialIssuanceByStatus.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Material Issuance Slips');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listMaterialIssuanceByStatus.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = materialIssuanceSlice.actions;
export default materialIssuanceSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import moment from 'moment';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: null,
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const tempListClient = createAsyncThunk('tempListClient', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.get(
      `/rest/clients/company/${payload}?token=${accessToken}`
    );

    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const listClient = createAsyncThunk('listClient', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  let { company, fnCallback } = payload;
  if (typeof fnCallback === 'undefined') {
    fnCallback = () => {};
  }
  const response = await axiosInstance.get(`rest/clients/company/${company}?token=${accessToken}`);

  if (typeof response !== 'undefined') {
    const { status } = response;
    if (status === 200) {
      if (response.data.length === 0) {
        response.statusText = `${message.API_200_EMPTY} in clients`;
      } else {
        response.statusText = `${message.API_200_SUCCESS} in clients`;
      }
      fnCallback(response);
      return response;
    }

    if (status === 500 || status === 400) {
      fnCallback(response);
      return thunkAPI.rejectWithValue(response);
    }
  } else {
    const newReponse = {
      status: 500,
      statusText: message.API_UNDEFINED,
    };
    fnCallback(newReponse);
    return thunkAPI.rejectWithValue(response);
  }
});

export const listClientBySalesRep = createAsyncThunk('listClientBySalesRepAndDateAndDepot', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  let { company, salesRep, date, depot, fnCallback } = payload;
  if (typeof fnCallback === 'undefined') {
    fnCallback = () => {};
  }
  
  try {
    const response = await axiosInstance.get(`rest/clients/report/company/${company}/sales-rep/${salesRep}?token=${accessToken}`);

    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);

  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const addClient = createAsyncThunk('addClient', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/clients/?token=${accessToken}`, payload);
  return response;
});

export const deleteClient = createAsyncThunk('deleteClient', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/clients/delete?token=${accessToken}`, payload);
  return response;
});

export const getClient = createAsyncThunk('getClient', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/clients/${payload.id}?token=${accessToken}`);
  return response;
});

const clientSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [tempListClient.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for depot`,
      };
    },
    [tempListClient.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Depot');

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [tempListClient.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Depot');

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage: message,
      };
    },
    [listClient.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listClient.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for clients';
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listClient.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listClientBySalesRep.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for depot`,
      };
    },
    [listClientBySalesRep.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Depot');

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [listClientBySalesRep.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Depot');

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage: message,
      };
    },
  },
});

export const { clearData } = clientSlice.actions;
export default clientSlice.reducer;

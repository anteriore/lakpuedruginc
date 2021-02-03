import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

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
  },
});

export const { clearData } = clientSlice.actions;
export default clientSlice.reducer;

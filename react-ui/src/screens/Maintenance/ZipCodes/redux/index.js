import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

export const listZipCode = createAsyncThunk('listZipCode', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(`/rest/zip-codes?token=${accessToken}`);

  return response;
});

export const createZipCode = createAsyncThunk('createZipCode', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/zip-codes?token=${accessToken}`, payload);

  return response;
});

export const updateZipCode = createAsyncThunk('updateZipCode', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/zip-codes?token=${accessToken}`, payload);

  return response;
});

export const deleteZipCode = createAsyncThunk('deleteZipCode', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { id } = payload;
  const response = await axiosInstance.post(`/rest/zip-codes/delete?token=${accessToken}`, id);

  return response;
});

const zipCodeSlice = createSlice({
  name: 'zipCodes',
  initialState: {
    zipCodeList: [],
    status: '',
    statusMessage: '',
    action: '',
  },
  reducers: {},
  extraReducers: {
    [listZipCode.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listZipCode.fulfilled]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        zipCodeList: data,
        status: 'Fulfilled',
        action: 'get',
        statusMessage: message.ITEMS_GET_FULFILLED,
      };
    },
    [listZipCode.rejected]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        zipCodeList: data,
        status: 'Error',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [createZipCode.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_ADD_PENDING,
      };
    },
    [createZipCode.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_ADD_FULFILLED,
      };
    },
    [createZipCode.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_ADD_REJECTED,
      };
    },
    [updateZipCode.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_UPDATE_PENDING,
      };
    },
    [updateZipCode.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_UPDATE_FULFILLED,
      };
    },
    [updateZipCode.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_UPDATE_REJECTED,
      };
    },
    [deleteZipCode.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_DELETE_PENDING,
      };
    },
    [deleteZipCode.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_DELETE_FULFILLED,
      };
    },
    [deleteZipCode.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
  },
});

export default zipCodeSlice.reducer;

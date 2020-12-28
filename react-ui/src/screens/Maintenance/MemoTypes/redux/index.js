import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

export const listMemo = createAsyncThunk('listMemo', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(`/rest/memo-types?token=${accessToken}`);

  return response;
});

export const createMemo = createAsyncThunk('createMemo', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/memo-types?token=${accessToken}`, payload);

  return response;
});

export const updateMemo = createAsyncThunk('updateMemo', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/memo-types?token=${accessToken}`, payload);

  return response;
});

export const deleteMemo = createAsyncThunk('deleteMemo', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { id } = payload;
  const response = await axiosInstance.post(`/rest/memo-types/delete?token=${accessToken}`, id);

  return response;
});

const memoSlice = createSlice({
  name: 'memoTypes',
  initialState: {
    memoList: [],
    status: '',
    statusMessage: '',
    action: '',
  },
  reducers: {},
  extraReducers: {
    [listMemo.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listMemo.fulfilled]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        memoList: data,
        status: 'Fulfilled',
        action: 'get',
        statusMessage: message.ITEMS_GET_FULFILLED,
      };
    },
    [listMemo.rejected]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        memoList: data,
        status: 'Error',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [createMemo.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_ADD_PENDING,
      };
    },
    [createMemo.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_ADD_FULFILLED,
      };
    },
    [createMemo.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_ADD_REJECTED,
      };
    },
    [updateMemo.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_UPDATE_PENDING,
      };
    },
    [updateMemo.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_UPDATE_FULFILLED,
      };
    },
    [updateMemo.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_UPDATE_REJECTED,
      };
    },
    [deleteMemo.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'pending',
        statusMessage: message.ITEM_DELETE_PENDING,
      };
    },
    [deleteMemo.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_DELETE_FULFILLED,
      };
    },
    [deleteMemo.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
  },
});

export default memoSlice.reducer;

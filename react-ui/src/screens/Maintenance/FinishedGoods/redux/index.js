import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import {
  ITEMS_GET_PENDING,
  ITEMS_GET_FULFILLED,
  ITEMS_GET_REJECTED,
  ITEM_ADD_PENDING,
  ITEM_ADD_FULFILLED,
  ITEM_ADD_REJECTED,
  ITEM_UPDATE_PENDING,
  ITEM_UPDATE_FULFILLED,
  ITEM_UPDATE_REJECTED,
  ITEM_DELETE_PENDING,
  ITEM_DELETE_FULFILLED,
  ITEM_DELETE_REJECTED,
} from '../../../../datas/constants/response-message.constant';

// Async Actions API section
export const getFGList = createAsyncThunk('getFGList', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(`/rest/finished-goods?token=${accessToken}`);

  return response;
});

export const createFG = createAsyncThunk('createFG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/finished-goods?token=${accessToken}`, payload);

  return response;
});

export const updateFG = createAsyncThunk('updateFG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/finished-goods?token=${accessToken}`, payload);

  return response;
});

export const deleteFG = createAsyncThunk('deleteFG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { id } = payload;
  const response = await axiosInstance.post(`/rest/finished-goods/delete?token=${accessToken}`, id);

  return response;
});

// Reducer Store section
const finishedGoodsSlice = createSlice({
  name: 'finishedGoods',
  initialState: {
    list: [],
    status: '',
    statusMessage: '',
    action: '',
  },
  reducers: {},
  extraReducers: {
    [getFGList.pending]: (state) => {
      return { ...state, status: 'Loading', action: 'get', statusMessage: ITEMS_GET_PENDING };
    },
    [getFGList.fulfilled]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        list: data,
        status: 'Fulfilled',
        action: 'get',
        statusMessage: ITEMS_GET_FULFILLED,
      };
    },
    [getFGList.rejected]: (state) => {
      return { ...state, status: 'Error', action: 'get', statusMessage: ITEMS_GET_REJECTED };
    },
    [createFG.pending]: (state) => {
      return { ...state, status: 'Loading', action: 'post', statusMessage: ITEM_ADD_PENDING };
    },
    [createFG.fulfilled]: (state) => {
      return { ...state, status: 'Fulfilled', action: 'post', statusMessage: ITEM_ADD_FULFILLED };
    },
    [createFG.rejected]: (state) => {
      return { ...state, status: 'Error', action: 'post', statusMessage: ITEM_ADD_REJECTED };
    },
    [updateFG.pending]: (state) => {
      return { ...state, status: 'Loading', action: 'post', statusMessage: ITEM_UPDATE_PENDING };
    },
    [updateFG.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: ITEM_UPDATE_FULFILLED,
      };
    },
    [updateFG.rejected]: (state) => {
      return { ...state, status: 'Error', action: 'post', statusMessage: ITEM_UPDATE_REJECTED };
    },
    [deleteFG.pending]: (state) => {
      return { ...state, status: 'Loading', statusMessage: ITEM_DELETE_PENDING };
    },
    [deleteFG.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: ITEM_DELETE_FULFILLED,
      };
    },
    [deleteFG.rejected]: (state) => {
      return { ...state, status: 'Error', action: 'post', statusMessage: ITEM_DELETE_REJECTED };
    },
  },
});

export default finishedGoodsSlice.reducer;

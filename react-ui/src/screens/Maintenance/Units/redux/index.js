import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import  * as message from '../../../../datas/constants/response-message.constant';

export const listUnit = createAsyncThunk('list', async(payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(`/rest/units?token=${accessToken}`);

  return response;
});

export const createUnit = createAsyncThunk('createUnit', async(payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/units?token=${accessToken}`, payload);

  return response;
});

export const updateUnit = createAsyncThunk('updateUnit', async(payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/units?token=${accessToken}`, payload);

  return response;
});

export const deleteUnit = createAsyncThunk('deleteUnit', async(payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { id } = payload;
  const response = await axiosInstance.post(`/rest/units/delete?token=${accessToken}`, id);

  return response;
});


const unitsSlice = createSlice({
  name: "Units",
  initialState:{
    unitList: [],
    status: '',
    statusMessage: '',
    action: ''
  },
  reducers: {},
  extraReducers: {
    [listUnit.pending]: (state, action) => {
      return {
        ...state, 
        status: "Loading", 
        action: 'get', 
        statusMessage: message.ITEMS_GET_PENDING
      }
    },
    [listUnit.fulfilled]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state, 
        unitList: data, 
        status: "Fulfilled", 
        action: 'get', 
        statusMessage: message.ITEMS_GET_FULFILLED
      }
    },
    [listUnit.rejected]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state, 
        unitList: data, 
        status: "Error", 
        action: 'get', 
        statusMessage: message.ITEMS_GET_REJECTED
      }
    },
    [createUnit.pending]: (state, action) => {
      return {...state, status: "Loading", action: 'post', statusMessage: message.ITEM_ADD_PENDING}
    },
    [createUnit.fulfilled]: (state, action) => {
      return {...state, status: "Fulfilled", action: 'post', statusMessage: message.ITEM_ADD_FULFILLED}
    },
    [createUnit.rejected]: (state, action) => {
      return {...state, status: "Error", action: 'post', statusMessage: message.ITEM_ADD_REJECTED}
    },
    [updateUnit.pending]: (state, action) => {
      return {...state, status: "Loading", action: 'post', statusMessage: message.ITEM_UPDATE_PENDING}
    },
    [updateUnit.fulfilled]: (state, action) => {
      return {...state, status: "Fulfilled", action: 'post', statusMessage: message.ITEM_UPDATE_FULFILLED}
    },
    [updateUnit.rejected]: (state, action) => {
      return {...state, status: "Error", action: 'post', statusMessage: message.ITEM_UPDATE_REJECTED}
    },
    [deleteUnit.pending]: (state, action) => {
      return {...state, status: "Loading", action: 'post', statusMessage: message.ITEM_DELETE_PENDING}
    },
    [deleteUnit.fulfilled]: (state, action) => {
      return {...state, status: "Fulfilled", action: 'post', statusMessage: message.ITEM_DELETE_FULFILLED}
    },
    [deleteUnit.rejected]: (state, action) => {
      return {...state, status: "Error", action: 'post', statusMessage: message.ITEM_DELETE_REJECTED}
    },
  }
});

export default unitsSlice.reducer;
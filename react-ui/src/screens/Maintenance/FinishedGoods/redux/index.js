import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance.js';
import { list } from '../../../Dashboard/PurchaseRequests/redux/index.js';

// Async Actions API section
export const getFGList = createAsyncThunk('getFGList', async( payload,thunkAPI ) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(`/rest/finished-goods?token=${accessToken}`);
  
  return response
});

export const createFG = createAsyncThunk('createFG', async(payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/finished-goods?token=${accessToken}`, payload);

  return response;
})

export const updateFG = createAsyncThunk('updateFG',async(payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.post(`/rest/finished-goods?token=${accessToken}`, payload);

  return response;
})

export const deleteFG = createAsyncThunk('deleteFG', async(payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { id } = payload;
  const response = await axiosInstance.post(`/rest/finished-goods/delete?token=${accessToken}`, id);

  return response;
})


// Reducer Store section
const finishedGoodsSlice = createSlice({
  name: "finishedGoods",
  initialState: {
    list: [],
    status: '',
    errorMessage: ''
  },
  reducers: {},
  extraReducers: {
    [getFGList.pending]: (state, action) => {
      return {...state, status: "Loading"}
    },
    [getFGList.fulfilled]: (state, action) => {
      const { data } = action.payload
      return {...state, list: data, status: "Fulfilled"}
    },
    [getFGList.rejected]: (state, action) => {
      return {...state,  
        errorMessage: action.error.message,
        status: "Error"
      }
    },
    [createFG.pending]: (state, action) => {
      return {...state, status: "Loading"}
    },
    [createFG.fulfilled]: (state, action) => {
      return {...state, status: "Fulfilled"}
    },
    [createFG.rejected]: (state, action) => {
      return {...state, errorMessage: action.error.message, status: "Error"}
    },
    [updateFG.pending]: (state, action) => {
      return {...state, status: "Loading"}
    },
    [updateFG.fulfilled]: (state, action) => {
      return {...state, status: "Fulfilled"}
    },
    [updateFG.rejected]: (state, action) => {
      return {...state, errorMessage: action.error.message, status: "Error"}
    },
    [deleteFG.pending]: (state, action) => {
      return {...state, status: "Loading"}
    },
    [deleteFG.fulfilled]: (state, action) => {
      return {...state, status: "Fulfilled"}
    },
    [deleteFG.rejected]: (state, action) => {
      return {...state, errorMessage: action.error.message, status: "Error"}
    }
  }
})

export default finishedGoodsSlice.reducer
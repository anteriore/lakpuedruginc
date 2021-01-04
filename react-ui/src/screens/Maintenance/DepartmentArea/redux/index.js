import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  deptList: null,
  areaList: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listD = createAsyncThunk('listD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/departments/company/${payload.company}?token=${accessToken}`
  );
  
  if(typeof response !== 'undefined' && response.status === 200){
    const { data } = response;
    if( data.length === 0){
      payload.message.warning("No data retrieved for departments")
    }
  }
  else {
    payload.message.error(message.ITEMS_GET_REJECTED)
  }

  return response;
});

export const addD = createAsyncThunk('addD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/departments/?token=${accessToken}`, payload);
  return response;
});

export const deleteD = createAsyncThunk('deleteD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/departments/delete?token=${accessToken}`,
    payload
  );
  return response;
});

export const listA = createAsyncThunk('listA', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/areas/company/${payload.company}?token=${accessToken}`
  );
  
  if(typeof response !== 'undefined' && response.status === 200){
    const { data } = response;
    if( data.length === 0){
      payload.message.warning("No data retrieved for areas")
    }
  }
  else {
    payload.message.error(message.ITEMS_GET_REJECTED)
  }

  return response;
});

export const addA = createAsyncThunk('addA', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/areas/?token=${accessToken}`, payload);
  return response;
});

export const deleteA = createAsyncThunk('deleteA', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/areas/delete?token=${accessToken}`, payload);
  return response;
});

const departmentAreaSlice = createSlice({
  name: 'departmentArea',
  initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listD.pending]: (state) => {
      state.status = 'loading';
    },
    [listD.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for departments"
        }

        return {
          ...state,
          deptList: data,
          status: 'succeeded',
          action: 'get',
          statusMessage: statusMessage,
        };
      }
      else {
        return {
          ...state,
          status: 'failed',
          action: 'get',
          statusMessage: message.ITEMS_GET_REJECTED,
        };
      }
    },
    [listD.rejected]: (state) => {
      state.status = 'failed';
    },

    [listA.pending]: (state) => {
      state.status = 'loading';
    },
    [listA.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for areas"
        }

        return {
          ...state,
          areaList: data,
          status: 'succeeded',
          action: 'get',
          statusMessage: statusMessage,
        };
      }
      else {
        return {
          ...state,
          status: 'failed',
          action: 'get',
          statusMessage: message.ITEMS_GET_REJECTED,
        };
      }
    },
    [listA.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = departmentAreaSlice.actions;
export default departmentAreaSlice.reducer;

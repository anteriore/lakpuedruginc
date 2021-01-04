import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listClassification = createAsyncThunk('listClassification', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/classifications?token=${accessToken}`);
  
  if(typeof response !== 'undefined' && response.status === 200){
    const { data } = response;
    if( data.length === 0){
      payload.message.warning("No data retrieved for classification")
    }
  }
  else {
    payload.message.error(message.ITEMS_GET_REJECTED)
  }

  return response;
});

export const addClassification = createAsyncThunk('addClassification', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/classifications/?token=${accessToken}`, payload);
  return response;
});

export const deleteClassification = createAsyncThunk('deleteClassification', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/classifications/delete?token=${accessToken}`,
    payload
  );
  return response;
});

const classificationSlice = createSlice({
  name: 'classification',
  initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listClassification.pending]: (state) => {
      state.status = 'loading';
    },
    [listClassification.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for classifications"
        }

        return {
          ...state,
          list: data,
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
    [listClassification.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = classificationSlice.actions;
export default classificationSlice.reducer;

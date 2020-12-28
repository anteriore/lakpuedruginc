import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { message as Message } from 'antd';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listC = createAsyncThunk('listC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/classifications?token=${accessToken}`);
  return response;
});

export const addC = createAsyncThunk('addC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/classifications/?token=${accessToken}`, payload);
  return response;
});

export const deleteC = createAsyncThunk('deleteC', async (payload, thunkAPI) => {
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
    [listC.pending]: (state) => {
      state.status = 'loading';
    },
    [listC.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for classifications"
          Message.warning(statusMessage)
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
        Message.error(message.ITEMS_GET_REJECTED)
        return {
          ...state,
          status: 'failed',
          action: 'get',
          statusMessage: message.ITEMS_GET_REJECTED,
        };
      }
    },
    [listC.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = classificationSlice.actions;
export default classificationSlice.reducer;

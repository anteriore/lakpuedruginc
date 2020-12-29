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

export const listPD = createAsyncThunk('listPD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/product-division-codes?token=${accessToken}`);
  return response;
});

export const addPD = createAsyncThunk('addPD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/product-division-codes/?token=${accessToken}`,
    payload
  );
  return response;
});

export const deletePD = createAsyncThunk('deletePD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/product-division-codes/delete?token=${accessToken}`,
    payload
  );
  return response;
});

const productDivisionSlice = createSlice({
  name: 'productDivisions',
  initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listPD.pending]: (state) => {
      state.status = 'loading';
    },
    [listPD.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for product divisions"
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
    [listPD.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = productDivisionSlice.actions;
export default productDivisionSlice.reducer;

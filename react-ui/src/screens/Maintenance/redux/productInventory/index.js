import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { message as Message } from 'antd';

export const listProductInventory = createAsyncThunk(
  'listProductInventory',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get(`/rest/product-inventory?token=${accessToken}`);

    return response;
  }
);

const initialState = {
  list: [],
  status: '',
  statusMessage: '',
  action: '',
}

const productInventorySlice = createSlice({
  name: 'productInventory',
  initialState: initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listProductInventory.pending]: (state) => {
      return {
        ...state,
        status: 'Loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listProductInventory.fulfilled]: (state, action) => {
      if(typeof action.payload !== 'undefined' && action.payload.status === 200){
        const { data } = action.payload;
        var statusMessage = message.ITEMS_GET_FULFILLED

        if( data.length === 0){
          statusMessage = "No data retrieved for product inventory"
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
    [listProductInventory.rejected]: (state) => {
      return {
        ...state,
        list: [],
        status: 'Error',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = productInventorySlice.actions;
export default productInventorySlice.reducer;

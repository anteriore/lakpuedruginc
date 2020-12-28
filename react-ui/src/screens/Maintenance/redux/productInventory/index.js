import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

export const listProductInventory = createAsyncThunk(
  'listProductInventory',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get(`/rest/product-inventory?token=${accessToken}`);

    return response;
  }
);

const productInventorySlice = createSlice({
  name: 'productInventory',
  initialState: {
    list: [],
    status: '',
    statusMessage: '',
    action: '',
  },
  reducers: {},
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
      const { data } = action.payload;
      return {
        ...state,
        list: data,
        status: 'Fulfilled',
        action: 'get',
        statusMessage: message.ITEMS_GET_FULFILLED,
      };
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

export default productInventorySlice.reducer;

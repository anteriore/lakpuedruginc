import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listInventory = createAsyncThunk('listInventory', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { inventory, fnCallback } = payload;
    const response = await axiosInstance.get(`rest/inventory/company/${inventory}?token=${accessToken}`);

    if (typeof response !== 'undefined') {
        const { status } = response;
        if (status === 200) {
            if (response.data.length === 0) {
                response.statusText = `${message.API_200_EMPTY} in inventory`;
            } else {
                response.statusText = `${message.API_200_SUCCESS} in inventory`;
            }
            fnCallback(response);
            
            return response;
        }
    
        if (status === 500 || status === 400) {
            fnCallback(response);
            
            return thunkAPI.rejectWithValue(response);
        }

    } else {
        const newReponse = {
        status: 500,
        statusText: message.API_UNDEFINED,
        };

        fnCallback(newReponse);
        
        return thunkAPI.rejectWithValue(response);
    }
});

export const addInventory = createAsyncThunk('addInventory', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post(`rest/inventory/?token=${accessToken}`, payload);
    
    return response;
});

export const updateInventory = createAsyncThunk('updateInventory', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post(`/rest/inventory/?token=${accessToken}`, payload);

    return response;
});
  
export const deleteInventory = createAsyncThunk('deleteInventory', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post(`rest/inventory/delete?token=${accessToken}`, payload);
    
    return response;
});

export const getInventory = createAsyncThunk('getInventory', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get(`rest/inventory/${payload.id}?token=${accessToken}`);
    
    return response;
});

const inventorySlice = createSlice({
    name: 'inventory',
    initialState,
    reducers: {
      clearData: () => initialState,
    },
    extraReducers: {
      [listInventory.pending]: (state, action) => {
        state.status = 'loading';
      },
      [listInventory.fulfilled]: (state, action) => {
        const { data } = action.payload;
        let statusMessage = message.ITEMS_GET_FULFILLED;
  
        if (data.length === 0) {
          statusMessage = 'No data retrieved for inventory';
        }
  
        return {
          ...state,
          list: data,
          status: 'succeeded',
          action: 'get',
          statusMessage,
        };
      },
      [listInventory.rejected]: (state, action) => {
        return {
          ...state,
          status: 'failed',
          action: 'get',
          statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = inventorySlice.actions;
export default inventorySlice.reducer;
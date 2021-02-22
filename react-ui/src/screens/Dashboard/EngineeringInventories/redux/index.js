import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: [],
  status: '',
  statusMessage: '',
  action: '',
};

export const listEngineeringInventory = createAsyncThunk('listEngineeringInventory', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company } = payload

  try {
    const response = await axiosInstance.get(`rest/engineering-inventory/company/${company}?token=${accessToken}`);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }

});


export const addEngineeringInventory = createAsyncThunk('addEngineeringInventory', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/engineering-inventory/?token=${accessToken}`, payload);
  return response;
});

export const deleteEngineeringInventory = createAsyncThunk('deleteEngineeringInventory', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/engineering-inventory/delete?token=${accessToken}`, payload);
  return response;
});

const engineeringInventorySlice = createSlice({
  name: 'engineeringInventories',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listEngineeringInventory.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listEngineeringInventory.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Engineering Inventory');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listEngineeringInventory.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = engineeringInventorySlice.actions;
export default engineeringInventorySlice.reducer;

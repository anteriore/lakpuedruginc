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

export const listInventoryMovement = createAsyncThunk('listInventoryMovement', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company } = payload

  try {
    const response = await axiosInstance.get(`rest/inventory-movements/company/${company}?token=${accessToken}`);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }

});

export const addInventoryMovement  = createAsyncThunk('addInventoryMovement', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/inventory-movements/?token=${accessToken}`, payload);
  return response;
});

export const deleteInventoryMovement  = createAsyncThunk('deleteInventoryMovement', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/inventory-movements/delete?token=${accessToken}`, payload);
  return response;
});

const inventoryMovementSlice = createSlice({
  name: 'inventoryMovements',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listInventoryMovement.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listInventoryMovement.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Inventory Movement Slips');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listInventoryMovement.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = inventoryMovementSlice.actions;
export default inventoryMovementSlice.reducer;

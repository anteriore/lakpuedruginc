import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: [],
  status: 'loading',
  statusLevel: '',
  statusMessage: '',
  responseCode: null,
  action: '',
};

export const listInventoryMovement = createAsyncThunk(
  'listInventoryMovement',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { company } = payload;

    try {
      const response = await axiosInstance.get(
        `rest/inventory-movements/company/${company}?token=${accessToken}`
      );
      const { response: validatedResponse, valid } = checkResponseValidity(response);

      if (valid) {
        return validatedResponse;
      }
      return thunkAPI.rejectWithValue(validatedResponse);
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: null,
        data: null,
        statusText: message.ERROR_OCCURED
      });
    }
  }
);

export const addInventoryMovement = createAsyncThunk(
  'addInventoryMovement',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    try {
      const response = await axiosInstance.post(
        `rest/inventory-movements/?token=${accessToken}`,
        payload
      );
      const { response: validatedResponse, valid } = checkResponseValidity(response);

      if (valid) {
        return validatedResponse;
      }
      return thunkAPI.rejectWithValue(validatedResponse);
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: null,
        data: null,
        statusText: message.ERROR_OCCURED
      });
    }
  }
);

export const deleteInventoryMovement = createAsyncThunk(
  'deleteInventoryMovement',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    try {
      const response = await axiosInstance.post(
        `rest/inventory-movements/delete?token=${accessToken}`,
        payload
      );
      const { response: validatedResponse, valid } = checkResponseValidity(response);

      if (valid) {
        return validatedResponse;
      }
      return thunkAPI.rejectWithValue(validatedResponse);
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: null,
        data: null,
        statusText: message.ERROR_OCCURED
      });
    }
  }
);

const inventoryMovementSlice = createSlice({
  name: 'inventoryMovements',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listInventoryMovement.pending]: (state) => {
      return { 
        ...state,  
        action: 'fetch', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for inventory movement slips` 
      };
    },
    [listInventoryMovement.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(
        action.payload, 
        'Inventory Movement Slips',
        state.action
      );

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [listInventoryMovement.rejected]: (state, action) => {
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Inventory Movement Slips',
        state.action
      );

      return {
        ...state,
        data: [],
        status: 'failed',
        statusLevel: level,
        responseCode: null,
        statusMessage,
      };
    },
    [addInventoryMovement.pending]: (state) => {
      return { 
        ...state,  
        action: 'create', 
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEM_ADD_PENDING} for inventory movement` 
      };
    },
    [addInventoryMovement.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Inventory Movement Slips', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [addInventoryMovement.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Inventory Movement Slips',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
  },
});

export const { clearData } = inventoryMovementSlice.actions;
export default inventoryMovementSlice.reducer;

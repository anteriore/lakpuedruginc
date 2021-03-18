import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import {
  ITEMS_GET_PENDING,
  ITEM_ADD_PENDING,
  ITEM_UPDATE_PENDING,
  ITEM_DELETE_PENDING,
} from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

// Async Actions API section
export const getFGList = createAsyncThunk(
  'getFGList',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    try{
      const response = await axiosInstance.get(`/rest/finished-goods?token=${accessToken}`);

      const { response: validatedResponse, valid } = checkResponseValidity(response);

      if (valid) {
        return validatedResponse;
      }
      return thunkAPI.rejectWithValue(validatedResponse);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const createFG = createAsyncThunk('createFG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try{
    const response = await axiosInstance.post(`/rest/finished-goods?token=${accessToken}`, payload);

    const { response: validateResponse, valid } = checkResponseValidity(response);
    if (valid) {
      return validateResponse;
    }
    return thunkAPI.rejectWithValue(validateResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateFG = createAsyncThunk('updateFG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`/rest/finished-goods?token=${accessToken}`, payload);
    const { response: validateResponse, valid } = checkResponseValidity(response);
    if (valid) {
      return validateResponse;
    }
    return thunkAPI.rejectWithValue(validateResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const deleteFG = createAsyncThunk('deleteFG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { id } = payload;
  try {
    const response = await axiosInstance.post(`/rest/finished-goods/delete?token=${accessToken}`, id);
    const { response: validateResponse, valid } = checkResponseValidity(response);
    if (valid) {
      return validateResponse;
    }
    return thunkAPI.rejectWithValue(validateResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const initialState = {
  list: [],
  status: 'loading',
  statusLevel: 'loading',
  responseCode: null,
  statusMessage: '',
  action: '',
};

// Reducer Store section
const finishedGoodsSlice = createSlice({
  name: 'finishedGoods',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [getFGList.pending]: (state) => {
      return { 
        ...state,  
        action: 'fetch', 
        status: 'loading',
        statusLevel: 'loading',
        statusMessage: `${ITEMS_GET_PENDING} for finished goods` 
      };
    },
    [getFGList.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Finished Goods',
        state.action
      );

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level, 
        responseCode: status, 
        statusMessage,
      };
    },
    [getFGList.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Finished Goods',
        state.action
      );

      return {
        ...state,
        data: [],
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [createFG.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusMessage: `${ITEM_ADD_PENDING} for finished goods`,
        statusLevel: 'loading',
        responseCode: null,
      };
    },
    [createFG.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Finished Goods',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [createFG.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Finished Goods',
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
    [updateFG.pending]: (state) => {
      return {
        ...state,
        action: 'update',
        status: 'loading',
        statusMessage: `${ITEM_UPDATE_PENDING} for finished goods`,
        statusLevel: 'loading',
        responseCode: null,
      };
    },
    [updateFG.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Finished Goods',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [updateFG.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Finished Goods',
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
    [deleteFG.pending]: (state) => {
      return {
        ...state,
        action: 'delete',
        status: 'loading',
        statusMessage: `${ITEM_DELETE_PENDING} for finished goods`,
        statusLevel: 'loading',
        responseCode: null,
      };
    },
    [deleteFG.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Finished Goods',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [deleteFG.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Finished Goods',
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

export const { clearData } = finishedGoodsSlice.actions;
export default finishedGoodsSlice.reducer;

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
  const response = await axiosInstance.post(`/rest/finished-goods?token=${accessToken}`, payload);

  return response;
});

export const deleteFG = createAsyncThunk('deleteFG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { id } = payload;
  const response = await axiosInstance.post(`/rest/finished-goods/delete?token=${accessToken}`, id);

  return response;
});

const initialState = {
  list: [],
  status: 'loading',
  statusLevel: '',
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
        statusMessage: ITEMS_GET_PENDING 
      };
    },
    [getFGList.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Finished Goods'
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
        'Finished Goods'
      );

      return {
        ...state,
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
        statusLevel: '',
        responseCode: null,
      };
    },
    [createFG.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Finshed Goods'
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
        'Finished Goods'
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
        statusLevel: '',
        responseCode: null,
      };
    },
    [updateFG.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Finshed Goods'
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
        'Finished Goods'
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
        statusLevel: '',
        responseCode: null,
      };
    },
    [deleteFG.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Finshed Goods'
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
        'Finished Goods'
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

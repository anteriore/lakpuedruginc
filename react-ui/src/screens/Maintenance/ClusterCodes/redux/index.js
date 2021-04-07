import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: [],
  status: 'loading',
  statusLevel: 'loading',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listCluster = createAsyncThunk(
  'listCluster',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    try {
      const response = await axiosInstance.get(`/rest/cluster-codes?token=${accessToken}`);
  
      const { response: validatedResponse, valid } = checkResponseValidity(response);
  
      if (valid) {
        return validatedResponse;
      }
      return thunkAPI.rejectWithValue(validatedResponse);
    } catch (err) {
      return thunkAPI.rejectWithValue({
        status: null,
        data: null,
        statusText: 'failed. An error has occurred'
      });
    }
  }
);

export const createCluster = createAsyncThunk('createCluster', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`/rest/cluster-codes?token=${accessToken}`, payload);

    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

export const updateCluster = createAsyncThunk('updateCluster', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.post(`/rest/cluster-codes?token=${accessToken}`, payload);

    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

export const deleteCluster = createAsyncThunk('deleteCluster', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { id } = payload;
  
  try {
    const response = await axiosInstance.post(`/rest/cluster-codes/delete?token=${accessToken}`, id);

    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});
const clusterCodeSlice = createSlice({
  name: 'clusterCode',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listCluster.pending]: (state) => {
      return { 
        ...state,  
        action: 'fetch', 
        status: 'loading',
        statusLevel: 'loading',
        statusMessage: `${message.ITEMS_GET_PENDING} for clusters` 
      };
    },
    [listCluster.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cluster Codes', state.action);

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [listCluster.rejected]: (state, action) => {
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Cluster Codes',
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
    [createCluster.pending]: (state) => {
      return { 
        ...state,  
        action: 'create', 
        status: 'loading',
        statusLevel: 'loading',
        statusMessage: `${message.ITEMS_GET_PENDING} for clusters` 
      };
    },
    [createCluster.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cluster Codes', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [createCluster.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Cluster Codes',
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
    [updateCluster.pending]: (state) => {
      return { 
        ...state,  
        action: 'update', 
        status: 'loading',
        statusLevel: 'loading',
        statusMessage: `${message.ITEMS_GET_PENDING} for clusters` 
      };
    },
    [updateCluster.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cluster Codes', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [updateCluster.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Cluster Codes',
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
    [deleteCluster.pending]: (state) => {
      return { 
        ...state,  
        action: 'delete', 
        status: 'loading',
        statusLevel: 'loading',
        statusMessage: `${message.ITEMS_GET_PENDING} for clusters` 
      };
    },
    [deleteCluster.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Cluster Codes', state.action);

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [deleteCluster.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Cluster Codes',
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

export const { clearData } = clusterCodeSlice.actions;
export default clusterCodeSlice.reducer;

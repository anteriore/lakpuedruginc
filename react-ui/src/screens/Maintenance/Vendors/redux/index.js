import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listVendor = createAsyncThunk('listVendor', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.get(
      `rest/vendors/company/${payload.company}/?token=${accessToken}`
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
      statusText: 'failed. An error has occurred',
    });
  }
});

export const addVendor = createAsyncThunk('addVendor', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`rest/vendors/?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred',
    });
  }
});

export const updateVendor = createAsyncThunk('updateVendor', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`rest/vendors/?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred',
    });
  }
});

export const getVendor = createAsyncThunk('getVendor', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.get(`rest/vendors/${payload.id}?token=${accessToken}`);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred',
    });
  }
});

export const deleteVendor = createAsyncThunk('deleteVendor', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`rest/vendors/delete?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred',
    });
  }
});

const vendorSlice = createSlice({
  name: 'vendors',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listVendor.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for vendors`,
      };
    },
    [listVendor.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Vendors',
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
    [listVendor.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Vendors',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage,
      };
    },
    [addVendor.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusMessage: `${message.ITEM_ADD_PENDING} for vendor`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [addVendor.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Vendors',
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
    [addVendor.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Vendors',
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
    [updateVendor.pending]: (state) => {
      return {
        ...state,
        action: 'update',
        status: 'loading',
        statusMessage: `${message.ITEM_UPDATE_PENDING} for vendor`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [updateVendor.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Vendors',
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
    [updateVendor.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Vendors',
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
    [deleteVendor.pending]: (state) => {
      return {
        ...state,
        action: 'delete',
        status: 'loading',
        statusMessage: `${message.ITEM_DELETE_PENDING} for vendor`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [deleteVendor.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Vendors',
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
    [deleteVendor.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Vendors',
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

export const { clearData } = vendorSlice.actions;
export default vendorSlice.reducer;

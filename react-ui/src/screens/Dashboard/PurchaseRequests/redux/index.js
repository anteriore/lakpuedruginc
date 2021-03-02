/* eslint-disable no-redeclare, no-unused-vars, no-dupe-keys */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: [],
};

export const listPR = createAsyncThunk('listPR', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/purchase-requests/company/${payload.company}?token=${accessToken}`
  );

  if (typeof response !== 'undefined' && response.status === 200) {
    const { data } = response;
    if (data.length === 0) {
      payload.message.warning('No data retrieved for purchase requests');
    }
  } else {
    payload.message.error(message.ITEMS_GET_REJECTED);
    return thunkAPI.rejectWithValue(response);
  }

  return response;
});

export const listPRByStatus = createAsyncThunk('listPRByStatus', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company, status } = payload;

  try {
    const response = await axiosInstance.get(
      `rest/purchase-requests/company/${company}/status/${status}?token=${accessToken}`
    );
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const listPRByStatusAndDepartment = createAsyncThunk(
  'listPRByStatus',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { company, department, status } = payload;

    try {
      const response = await axiosInstance.get(
        `rest/purchase-requests/company/${company}/department/${department}/status/${status}?token=${accessToken}`
      );
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

export const getRequestedQuantityByItem = createAsyncThunk(
  'getRequestedItemByItem',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { company, item } = payload;

    const response = await axiosInstance.get(
      `rest/purchase-requests/company/${company}/stock/${item}?token=${accessToken}`
    );

    if (typeof response !== 'undefined' && response.status === 200) {
      const { data } = response;
      if (data.length === 0) {
        payload.message.warning('No data retrieved for requested items');
      }
    } else {
      payload.message.error(message.ITEMS_GET_REJECTED);
      return thunkAPI.rejectWithValue(response);
    }

    return response;
  }
);

export const addPR = createAsyncThunk('addPR', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/purchase-requests/?token=${accessToken}`,
    payload
  );
  return response;
});

export const approvePR = createAsyncThunk('approvePR', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/purchase-requests/approve/${payload.id}?token=${accessToken}`
  );
  return response;
});

export const rejectPR = createAsyncThunk('rejectPR', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/purchase-requests/reject/${payload.id}?token=${accessToken}`
  );
  return response;
});


export const cancelPR = createAsyncThunk('cancelPR', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/purchase-requests/cancel/${payload.id}?token=${accessToken}`, payload
  );
  return response;
});

export const deletePR = createAsyncThunk('deletePR', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/purchase-requests/delete?token=${accessToken}`,
    payload
  );
  return response;
});

const purchaseRequestSlice = createSlice({
  name: 'purchaseRequest',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listPR.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listPR.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for sales orders';
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listPR.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },

    [listPRByStatus.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for purchase requests`,
      };
    },
    [listPRByStatus.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'purchase requests');

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [listPRByStatus.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'purchase requests');

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage: message,
      };
    },

    [listPRByStatusAndDepartment.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for purchase requests`,
      };
    },
    [listPRByStatusAndDepartment.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'purchase requests');

      return {
        ...state,
        list: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage: message,
      };
    },
    [listPRByStatusAndDepartment.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'purchase requests');

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage: message,
      };
    },
  },
});
export const { resetItemData, clearData } = purchaseRequestSlice.actions;

export default purchaseRequestSlice.reducer;

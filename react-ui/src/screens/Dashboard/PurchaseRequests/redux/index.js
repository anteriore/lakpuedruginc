/* eslint-disable no-redeclare, no-unused-vars, no-dupe-keys */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

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

export const listPRByStatus = createAsyncThunk(
  'listPRByStatus',
  async (payload, thunkAPI, rejectWithValue) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.get(
      `rest/purchase-requests/company/${payload.company}/status/${payload.status}?token=${accessToken}`
    );

    if (typeof response !== 'undefined' && response.status === 200) {
      const { data } = response;
      if (data.length === 0) {
        payload.message.warning('No data retrieved for purchase requests');
      }
    } else {
      payload.message.error(message.ITEMS_GET_REJECTED);
      return rejectWithValue(response);
    }

    return response;
  }
);

export const getRequestedQuantityByItem = createAsyncThunk('getRequestedItemByItem', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company, item } = payload

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
});

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

    [listPRByStatus.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listPRByStatus.fulfilled]: (state, action) => {
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
    [listPRByStatus.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});
export const { resetItemData, clearData } = purchaseRequestSlice.actions;

export default purchaseRequestSlice.reducer;

/* eslint-disable no-redeclare, no-unused-vars, no-dupe-keys */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  listData: [],
  itemData: {
    id: null,
    number: null,
    date: null,
    dateNeeded: null,
    department: null,
    remarks: null,
    requestedBy: null,
    status: null,
    requestedItems: [],
  },
  list: null,
};

export const listPR = createAsyncThunk('listPR', async (payload, thunkAPI, rejectWithValue) => {
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
    return rejectWithValue(response);
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

export const getPR = createAsyncThunk('getPR', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/purchase-requests/${payload.id}?token=${accessToken}`
  );
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

const processData = (data, action) => {
  if (action === 'listPR/fulfilled') {
    var processedData = [];
    for (const [index, value] of data.entries()) {
      var item = {
        id: value.id,
        number: value.number,
        date: value.date,
        dateNeeded: value.dateNeeded,
        department: value.department !== null ? value.department.name : '',
        remarks: value.remarks,
        requestedBy: value.requestedBy,
        status: value.status,
      };
      processedData.push(item);
    }
  } else if (action === 'getPR/fulfilled') {
    const requestedItems = [];
    for (const [index, value] of data.requestedItems.entries()) {
      var item = {
        id: value.item.id,
        code: value.item.code,
        name: value.item.name,
        unit: {
          id: value.item.unit.id,
          name: value.item.unit.name,
        },
        type: {
          id: value.item.type.id,
          code: value.item.type.code,
          name: value.item.type.name,
        },
        stocks: value.quantityRemaining,
        quantityRequested: value.quantityRequested,
        purchase_request: null,
        purchase_order: null,
        quarantined: null,
      };
      requestedItems.push(item);
    }

    processedData = {
      id: data.id,
      number: data.number,
      date: data.date,
      dateNeeded: data.dateNeeded,
      department: data.department,
      remarks: data.remarks,
      requestedBy: data.requestedBy,
      status: data.status,
      requestedItems,
    };
  }

  return processedData;
};

const purchaseRequestSlice = createSlice({
  name: 'purchaseRequest',
  initialState,
  reducers: {
    resetItemData(state, action) {
      state.itemData = {
        id: null,
        number: null,
        date: null,
        dateNeeded: null,
        department: null,
        remarks: null,
        requestedBy: null,
        status: null,
        requestedItems: [],
      };
    },
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
        listData: processData(data, action.type),
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
        listData: processData(data, action.type),
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

    [getPR.pending]: (state, action) => {
      state.status = 'loading';
    },
    [getPR.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.itemData = processData(action.payload.data, action.type);
      } else {
        state.status = 'failed';
      }
    },
    [getPR.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});
export const { resetItemData, clearData } = purchaseRequestSlice.actions;

export default purchaseRequestSlice.reducer;

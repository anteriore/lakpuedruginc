import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: [],
  report: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listI = createAsyncThunk('listI', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/items?token=${accessToken}`);

  if (typeof response !== 'undefined' && response.status === 200) {
    const { data } = response;
    if (data.length === 0) {
      payload.message.warning('No data retrieved for items');
    }
  } else {
    payload.message.error(message.ITEMS_GET_REJECTED);
    return thunkAPI.rejectWithValue(response);
  }

  return response;
});

export const listItemReportSummaryByProduct = createAsyncThunk('listItemReportSummaryByProduct', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { depot, dateRange, item } = payload; 

  const response = await axiosInstance.get(`rest/sales-reports/item-sales-report/depot/${depot}/start/${dateRange[0]}/end/${dateRange[1]}/item/${item}?token=${accessToken}`);

  if (typeof response !== 'undefined' && response.status === 200) {
    const { data } = response;
    if (data.length === 0) {
      payload.message.warning('No data retrieved for items');
    }
  } else {
    payload.message.error(message.ITEMS_GET_REJECTED);
    return thunkAPI.rejectWithValue(response);
  }

  return response;

});

export const listItemByType = createAsyncThunk('listItemByType', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { type } = payload;

  const response = await axiosInstance.get(`rest/items/type/${type}?token=${accessToken}`);

  if (typeof response !== 'undefined' && response.status === 200) {
    const { data } = response;
    if (data.length === 0) {
      payload.message.warning('No data retrieved for items');
    }
  } else {
    payload.message.error(message.ITEMS_GET_REJECTED);
    return thunkAPI.rejectWithValue(response);
  }

  return response;
});

export const listItemSummary = createAsyncThunk('listItemSummary', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company } = payload

  const response = await axiosInstance.get(`rest/items/company/${company}/summary/?token=${accessToken}`);

  if (typeof response !== 'undefined' && response.status === 200) {
    const { data } = response;
    if (data.length === 0) {
      payload.message.warning('No data retrieved for items');
    }
  } else {
    payload.message.error(message.ITEMS_GET_REJECTED);
    return thunkAPI.rejectWithValue(response);
  }

  return response;
});

export const addI = createAsyncThunk('addI', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/items/?token=${accessToken}`, payload);
  return response;
});

export const deleteI = createAsyncThunk('deleteI', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/items/delete?token=${accessToken}`, payload);
  return response;
});

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listI.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listI.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for items';
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listI.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
    [listItemByType.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listItemByType.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for items';
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listItemByType.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
    [listItemSummary.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listItemSummary.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for items';
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listItemSummary.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
    /*[listItemReportSummaryByProduct.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listItemReportSummaryByProduct.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for items';
      }

      return {
        ...state,
        report: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listItemReportSummaryByProduct.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },*/
  },
});

export const { clearData } = itemSlice.actions;
export default itemSlice.reducer;

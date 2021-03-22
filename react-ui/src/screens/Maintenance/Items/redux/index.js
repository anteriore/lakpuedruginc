import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: [],
  report: null,
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listI = createAsyncThunk('listI', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(`rest/items?token=${accessToken}`);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const listItemWithoutEng = createAsyncThunk('listItemWithoutEng', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(`rest/items/rm-pm?token=${accessToken}`);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const listItemReportSummaryByProduct = createAsyncThunk(
  'listItemReportSummaryByProduct',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { depot, dateRange, product } = payload;

    try {
      const response = await axiosInstance.get(
        `rest/sales-reports/item-sales-report/depot/${depot}/start/${dateRange[0]}/end/${dateRange[1]}/item/${product}?token=${accessToken}`
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
  const { company } = payload;

  const response = await axiosInstance.get(
    `rest/items/company/${company}/summary/?token=${accessToken}`
  );

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

export const listItemSummaryNonEngineering = createAsyncThunk('listItemSummaryNonEngineering', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company } = payload;

  const response = await axiosInstance.get(
    `rest/items/company/${company}/summary/non-eng?token=${accessToken}`
  );

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

export const listItemSummaryEngineering = createAsyncThunk('listItemSummaryEngineering', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company } = payload;

  const response = await axiosInstance.get(
    `rest/items/company/${company}/summary/eng?token=${accessToken}`
  );

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
  try {
    const response = await axiosInstance.post(`rest/items/?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateI = createAsyncThunk('updateI', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`rest/items/?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const deleteI = createAsyncThunk('deleteI', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  
  try {
    const response = await axiosInstance.post(`rest/items/delete?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

const itemSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listI.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusMessage: message.ITEMS_GET_PENDING
      };
    },
    [listI.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Items',
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
    [listI.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Items',
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
    [addI.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusMessage: `${message.ITEM_ADD_PENDING} for items`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [addI.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Items',
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
    [addI.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Items',
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
    [updateI.pending]: (state) => {
      return {
        ...state,
        action: 'update',
        status: 'loading',
        statusMessage: `${message.ITEM_UPDATE_PENDING} for items`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [updateI.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Items',
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
    [updateI.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Items',
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
    [deleteI.pending]: (state) => {
      return {
        ...state,
        action: 'delete',
        status: 'loading',
        statusMessage: `${message.ITEM_DELETE_PENDING} for items`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [deleteI.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Items',
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
    [deleteI.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Items',
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
    [listItemWithoutEng.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusMessage: message.ITEMS_GET_PENDING
      };
    },
    [listItemWithoutEng.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Items',
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
    [listItemWithoutEng.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Items',
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
    [listItemSummaryEngineering.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listItemSummaryEngineering.fulfilled]: (state, action) => {
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
    [listItemSummaryEngineering.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
    [listItemSummaryNonEngineering.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listItemSummaryNonEngineering.fulfilled]: (state, action) => {
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
    [listItemSummaryNonEngineering.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
    /* [listItemReportSummaryByProduct.pending]: (state, action) => {
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
    }, */
  },
});

export const { clearData } = itemSlice.actions;
export default itemSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

export const listSalesInvoice = createAsyncThunk('listSalesInvoice', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(
      `/rest/sales-invoices/company/${payload}?token=${accessToken}`
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

export const listSalesInvoiceByDepot = createAsyncThunk(
  'listSalesInvoiceByDepot',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    try {
      const response = await axiosInstance.get(
        `/rest/sales-invoices/depot/${payload.depot}?token=${accessToken}`
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

export const listSalesInvoiceWithBalanceByDepot = createAsyncThunk('listSalesInvoiceWithBalanceByDepot', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(
      `/rest/sales-invoices/depot/${payload.depot}?token=${accessToken}`
    );

    const processedResponse = {
      ...response,
      data: filterSIWithBalance(response.data)
    }

    const { response: validatedResponse, valid } = checkResponseValidity(processedResponse);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const createSalesInvoice = createAsyncThunk(
  'createSalesInvoice',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    try {
      const response = await axiosInstance.post(
        `/rest/sales-invoices?token=${accessToken}`,
        payload
      );

      const { response: validateResponse, valid } = checkResponseValidity(response);
      if (valid) {
        return validateResponse;
      }
      return thunkAPI.rejectWithValue(validateResponse);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const filterSIWithBalance = (data) => {
  const processedData = []
  data.forEach((salesInvoice) => {
    if(salesInvoice.remainingBalance > 0){
      processedData.push(salesInvoice)
    }
  })

  return processedData

}

const initialState = {
  salesInvoiceList: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

const salesInvoiceSlice = createSlice({
  name: 'salesInvoice',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listSalesInvoice.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for sales invoice`,
      };
    },
    [listSalesInvoice.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Sales Invoice'
      );

      return {
        ...state,
        salesInvoiceList: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [listSalesInvoice.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Sales Invoice'
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
    [listSalesInvoiceByDepot.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for sales invoice`,
      };
    },
    [listSalesInvoiceByDepot.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Sales Invoice'
      );

      return {
        ...state,
        salesInvoiceList: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [listSalesInvoiceByDepot.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Sales Invoice in the selected Depot'
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
    [listSalesInvoiceWithBalanceByDepot.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for sales invoice`,
      };
    },
    [listSalesInvoiceWithBalanceByDepot.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Sales Invoice'
      );

      return {
        ...state,
        salesInvoiceList: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [listSalesInvoiceWithBalanceByDepot.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Sales Invoice in the selected Depot'
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
    [createSalesInvoice.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusMessage: `${message.ITEM_ADD_PENDING} for sales invoice`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [createSalesInvoice.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Sales Invoice'
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [createSalesInvoice.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Sales Invoice'
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

export const { clearData } = salesInvoiceSlice.actions;
export default salesInvoiceSlice.reducer;

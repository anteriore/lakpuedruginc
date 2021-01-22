import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

export const listSalesInvoice = createAsyncThunk('listSalesInvoice', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try{
    const response = await axiosInstance.get(
      `/rest/sales-invoices/company/${payload}?token=${accessToken}`
    );
    
    const {response:validatedResponse, valid} = checkResponseValidity(response);
  
    if (valid){
      return validatedResponse
    }else{
      return thunkAPI.rejectWithValue(validatedResponse)
    }
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }

})

const initialState = {
  salesInvoiceList: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
}

const salesInvoiceSlice = createSlice({
  name: 'salesInvoice',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listSalesInvoice.pending]: (state,) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for sales invoice`,
      };
    },
    [listSalesInvoice.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const {message, level} = generateStatusMessage(action.payload, 'Sales Invoice')

      return {
        ...state,
        salesInvoiceList: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status, 
        statusMessage: message,
      };
    },
    [listSalesInvoice.rejected]: (state, action) => {
      const {status} = action.payload
      const {message, level} = generateStatusMessage(action.payload, 'Sales Invoice')

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage: message,
      };
    },
  }
});

export const { clearData } = salesInvoiceSlice.actions;
export default salesInvoiceSlice.reducer;
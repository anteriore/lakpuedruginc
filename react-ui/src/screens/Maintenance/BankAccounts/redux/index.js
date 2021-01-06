import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

export const listBankAccount = createAsyncThunk('listBankAccount', async (payload, thunkAPI, rejectWithValue) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(`/rest/bank-accounts?token=${accessToken}`);
  
  if(typeof response !== 'undefined' && response.status === 200){
    const { data } = response;
    if( data.length === 0){
      payload.message.warning("No data retrieved for bank accounts")
    }
  }
  else {
    payload.message.error(message.ITEMS_GET_REJECTED)
    return rejectWithValue(response)
  }

  return response;
});

export const createBankAccount = createAsyncThunk(
  'createBankAccount',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post(`/rest/bank-accounts?token=${accessToken}`, payload);

    return response;
  }
);

export const updateBankAccount = createAsyncThunk(
  'updateBankAccount',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post(`/rest/bank-accounts?token=${accessToken}`, payload);

    return response;
  }
);

export const deleteBankAccount = createAsyncThunk(
  'deleteBankAccount',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { id } = payload;
    const response = await axiosInstance.post(
      `/rest/bank-accounts/delete?token=${accessToken}`,
      id
    );

    return response;
  }
);

const initialState = {
  bankAccountList: [],
  status: '',
  statusMessage: '',
  action: '',
};

const bankAccountSlice = createSlice({
  name: 'bankAccount',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listBankAccount.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listBankAccount.fulfilled]: (state, action) => {
      const { data } = action.payload;
      var statusMessage = message.ITEMS_GET_FULFILLED

      if( data.length === 0){
        statusMessage = "No data retrieved for bank accounts"
      }

      return {
        ...state,
        bankAccountList: data,
        status: 'succeeded',
        action: 'get',
        statusMessage: statusMessage,
      };
    },
    [listBankAccount.rejected]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        bankAccountList: data,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [createBankAccount.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_ADD_PENDING,
      };
    },
    [createBankAccount.fulfilled]: (state) => {
      return {
        ...state,
        status: 'succeeded',
        action: 'post',
        statusMessage: message.ITEM_ADD_FULFILLED,
      };
    },
    [createBankAccount.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_ADD_REJECTED,
      };
    },
    [updateBankAccount.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_UPDATE_PENDING,
      };
    },
    [updateBankAccount.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_UPDATE_FULFILLED,
      };
    },
    [updateBankAccount.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_UPDATE_REJECTED,
      };
    },
    [deleteBankAccount.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_DELETE_PENDING,
      };
    },
    [deleteBankAccount.fulfilled]: (state) => {
      return {
        ...state,
        status: 'succeeded',
        action: 'post',
        statusMessage: message.ITEM_DELETE_FULFILLED,
      };
    },
    [deleteBankAccount.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
  },
});

export const { clearData } = bankAccountSlice.actions;
export default bankAccountSlice.reducer;

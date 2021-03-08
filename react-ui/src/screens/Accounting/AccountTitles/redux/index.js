import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: [],
  status: '',
  statusMessage: '',
  action: '',
};

export const listAccountTitles = createAsyncThunk('listAccountTitles', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.get(
      `rest/account-titles/?token=${accessToken}`
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

export const listAccountTitlesByType = createAsyncThunk('listAccountTitlesByType', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { type } = payload;

  try {
    const response = await axiosInstance.get(
      `rest/account-titles/type/${type}?token=${accessToken}`
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

export const addAccountTitle = createAsyncThunk(
  'addAccountTitle',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/account-titles/?token=${accessToken}`,
      payload
    );
    return response;
  }
);

export const deleteAccountTitle = createAsyncThunk(
  'deleteAccountTitle',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.post(
      `rest/account-titles/delete?token=${accessToken}`,
      payload
    );
    return response;
  }
);

const accountTitleSlice = createSlice({
  name: 'accountTitles',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listAccountTitles.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listAccountTitles.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Account Titles');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listAccountTitles.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listAccountTitlesByType.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listAccountTitlesByType.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Account Titles');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listAccountTitlesByType.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = accountTitleSlice.actions;
export default accountTitleSlice.reducer;

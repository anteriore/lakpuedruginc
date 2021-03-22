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

export const listDM = createAsyncThunk('listDM', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/debit-memos?token=${accessToken}`
  );

  if (typeof response !== 'undefined' && response.status === 200) {
    const { data } = response;
    if (data.length === 0) {
      payload.message.warning('No data retrieved for demit memos');
    }
  } else {
    payload.message.error(message.ITEMS_GET_REJECTED);
    return thunkAPI.rejectWithValue(response);
  }

  return response;
});

export const addDM = createAsyncThunk('addDM', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.post(
      `/rest/debit-memos?token=${accessToken}`,
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
});

export const deleteDM = createAsyncThunk('deleteDM', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `/rest/debit-memos/delete?token=${accessToken}`,
    payload
  );

  return response;
});

export const getDM = createAsyncThunk('getDM', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/debit-memos/${payload.id}?token=${accessToken}`
  );
  return response;
});

const debitMemoSlice = createSlice({
  name: 'debitMemo',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listDM.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for debit memos`,
      };
    },
    [listDM.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Debit Memos'
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
    [listDM.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Debit Memos'
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
    [addDM.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusMessage: `${message.ITEM_ADD_PENDING} for debit memos`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [addDM.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Debit Memo'
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [addDM.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Debit Memo'
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

export const { clearData } = debitMemoSlice.actions;
export default debitMemoSlice.reducer;

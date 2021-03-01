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

export const listFGReceiving = createAsyncThunk('listFGReceiving', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company } = payload;

  try {
    const response = await axiosInstance.get(
      `rest/product-receivings/company/${company}?token=${accessToken}`
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

export const addFGReceiving = createAsyncThunk('addFGReceiving', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/product-receivings/?token=${accessToken}`,
    payload
  );
  return response;
});

export const deleteFGIssuance = createAsyncThunk('deleteFGIssuance', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/product-receivings/delete?token=${accessToken}`,
    payload
  );
  return response;
});

const FGReceivingSlice = createSlice({
  name: 'FGReceivings',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listFGReceiving.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listFGReceiving.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'FG Receiving');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listFGReceiving.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = FGReceivingSlice.actions;
export default FGReceivingSlice.reducer;

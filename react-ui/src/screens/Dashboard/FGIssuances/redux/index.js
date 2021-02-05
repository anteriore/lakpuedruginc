import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listFGIssuance = createAsyncThunk('listFGIssuance', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company } = payload

  try {
    const response = await axiosInstance.get(`rest/product-issuances/company/${company}?token=${accessToken}`);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }

});

export const addFGIssuance  = createAsyncThunk('addFGIssuance', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/product-issuances/?token=${accessToken}`, payload);
  return response;
});

export const deleteFGIssuance  = createAsyncThunk('deleteFGIssuance', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/product-issuances/delete?token=${accessToken}`, payload);
  return response;
});

const FGIssuanceSlice = createSlice({
  name: 'FGIssuances',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listFGIssuance.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listFGIssuance.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Sales Order');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listFGIssuance.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = FGIssuanceSlice.actions;
export default FGIssuanceSlice.reducer;

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

export const listMaterialReceiving = createAsyncThunk('listMaterialReceiving', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const { company } = payload

  try {
    const response = await axiosInstance.get(`rest/material-receivings/company/${company}?token=${accessToken}`);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }

});

export const addMaterialReceiving  = createAsyncThunk('addMaterialReceiving', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/material-receivings/?token=${accessToken}`, payload);
  return response;
});

export const deleteMaterialReceiving  = createAsyncThunk('deleteMaterialReceiving', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/material-receivings/delete?token=${accessToken}`, payload);
  return response;
});

const materialReceivingSlice = createSlice({
  name: 'materialReceivings',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listMaterialReceiving.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listMaterialReceiving.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message, level } = generateStatusMessage(action.payload, 'Material Receiving Slips');

      return {
        ...state,
        list: data,
        responseCode: status,
        statusLevel: level,
        statusMessage: message,
      };
    },
    [listMaterialReceiving.rejected]: (state, action) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = materialReceivingSlice.actions;
export default materialReceivingSlice.reducer;

import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

export const listMaterialReevaluations = createAsyncThunk('listMaterialReevaluations', async(payload, thunkAPI ) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(
      `/rest/material-reevaluations/company/${payload}?token=${accessToken}`
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

const initialState = {
  materialReevaluationsList: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
}

const materialReevaluationsSlice = createSlice({
  name: 'materialReevaluations',
  initialState,
  reducer: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listMaterialReevaluations.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for material reevaluations`,
      };
    },
    [listMaterialReevaluations.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Material Reevaluations'
      );

      return {
        ...state,
        materialReevaluationsList: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [listMaterialReevaluations.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Material Reevaluations'
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        action: 'fetch',
        statusMessage,
      };
    }
  }
})

export const { clearData } = materialReevaluationsSlice.actions;
export default materialReevaluationsSlice.reducer;
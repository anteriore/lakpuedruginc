import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

export const listJobOrders= createAsyncThunk('listJobOrders', async(_, thunkAPI ) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(
      `/rest/job-orders?token=${accessToken}`
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
  jobOrderList: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
}

const jobOrderSlice = createSlice({
  name: 'jobOrders',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listJobOrders.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        statusMessage: `${message.ITEMS_GET_PENDING} for job orders`,
      };
    },
    [listJobOrders.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Job Orders'
      );

      return {
        ...state,
        jobOrderList: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [listJobOrders.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Job Orders'
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
  }
})

export const { clearData } = jobOrderSlice.actions;
export default jobOrderSlice.reducer;
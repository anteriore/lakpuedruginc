import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios-instance';
import * as message from '../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../helpers/general-helper';

export const listCompany = createAsyncThunk('listCompany', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(`/rest/companies?token=${accessToken}`);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: message.ERROR_OCCURED,
    });
  }
});

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companyList: [],
    selectedCompany: 1,
    status: '',
    statusMessage: '',
    statusLevel: '',
    action: '',
    responseCode: null,
  },
  reducers: {
    setCompany(state, selectedCompany) {
      state.selectedCompany = selectedCompany.payload;
    },
  },
  extraReducers: {
    [listCompany.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for Companies`,
      };
    },
    [listCompany.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Companies',
        state.action
      );

      return {
        ...state,
        companyList: data,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [listCompany.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Companies',
        state.action
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
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;

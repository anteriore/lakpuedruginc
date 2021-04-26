import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios-instance';
import * as message from '../../data/constants/response-message.constant';
import { checkResponseValidity } from '../../helpers/general-helper';

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
    action: '',
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
        status: 'Loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listCompany.fulfilled]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        companyList: data,
        status: 'Fulfilled',
        action: 'get',
        statusMessage: message.ITEMS_GET_FULFILLED,
      };
    },
    [listCompany.rejected]: (state, action) => {
      return {
        ...state,
        status: 'Error',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { setCompany } = companySlice.actions;
export default companySlice.reducer;

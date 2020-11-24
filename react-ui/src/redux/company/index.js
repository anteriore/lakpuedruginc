import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios-instance';
import * as message from '../../datas/constants/response-message.constant';

export const listCompany = createAsyncThunk('listCompany', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(`/rest/companies?token=${accessToken}`);

  return response;
});

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companyList: [],
    status: '',
    statusMessage: '',
    action: '',
  },
  reducers: {},
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
      const { data } = action.payload;
      return {
        ...state,
        companyList: data,
        status: 'Error',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export default companySlice.reducer;

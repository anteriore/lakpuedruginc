import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

export const listProvinceCode = createAsyncThunk(
  'listProvinceCode',
  async (payload, thunkAPI, rejectWithValue) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get(`/rest/province-codes?token=${accessToken}`);

    if (typeof response !== 'undefined' && response.status === 200) {
      const { data } = response;
      if (data.length === 0) {
        payload.message.warning('No data retrieved for province codes');
      }
    } else {
      payload.message.error(message.ITEMS_GET_REJECTED);
      return rejectWithValue(response);
    }

    return response;
  }
);

export const createProvinceCode = createAsyncThunk(
  'createProvinceCode',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post(`/rest/province-codes?token=${accessToken}`, payload);

    return response;
  }
);

export const updateProvinceCode = createAsyncThunk(
  'updateProvinceCode',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post(`/rest/province-codes?token=${accessToken}`, payload);

    return response;
  }
);

export const deleteProvinceCode = createAsyncThunk(
  'deleteProvinceCode',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { id } = payload;
    const response = await axiosInstance.post(
      `/rest/province-codes/delete?token=${accessToken}`,
      id
    );

    return response;
  }
);

const initialState = {
  provinceCodeList: [],
  status: '',
  statusMessage: '',
  action: '',
};

const provinceCodeSlice = createSlice({
  name: 'provinceCodes',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listProvinceCode.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listProvinceCode.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for province codes';
      }

      return {
        ...state,
        provinceCodeList: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listProvinceCode.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [createProvinceCode.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_ADD_PENDING,
      };
    },
    [createProvinceCode.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_ADD_FULFILLED,
      };
    },
    [createProvinceCode.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_ADD_REJECTED,
      };
    },
    [updateProvinceCode.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_UPDATE_PENDING,
      };
    },
    [updateProvinceCode.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_UPDATE_FULFILLED,
      };
    },
    [updateProvinceCode.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_UPDATE_REJECTED,
      };
    },
    [deleteProvinceCode.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_DELETE_PENDING,
      };
    },
    [deleteProvinceCode.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_DELETE_FULFILLED,
      };
    },
    [deleteProvinceCode.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
  },
});

export const { clearData } = provinceCodeSlice.actions;
export default provinceCodeSlice.reducer;

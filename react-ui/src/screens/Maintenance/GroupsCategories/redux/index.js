import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  groupList: null,
  categoryList: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listG = createAsyncThunk('listG', async (payload, thunkAPI, rejectWithValue) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/group/company/${payload.company}?token=${accessToken}`
  );

  if (typeof response !== 'undefined' && response.status === 200) {
    const { data } = response;
    if (data.length === 0) {
      payload.message.warning('No data retrieved for groups');
    }
  } else {
    payload.message.error(message.ITEMS_GET_REJECTED);
    return rejectWithValue(response);
  }

  return response;
});

export const addG = createAsyncThunk('addG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/group/?token=${accessToken}`, payload);
  return response;
});

export const deleteG = createAsyncThunk('deleteG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/group/delete?token=${accessToken}`, payload);
  return response;
});

export const listC = createAsyncThunk('listC', async (payload, thunkAPI, rejectWithValue) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/category/?token=${accessToken}`);

  if (typeof response !== 'undefined' && response.status === 200) {
    const { data } = response;
    if (data.length === 0) {
      payload.message.warning('No data retrieved for categories');
    }
  } else {
    payload.message.error(message.ITEMS_GET_REJECTED);
    return rejectWithValue(response);
  }

  return response;
});

export const addC = createAsyncThunk('addC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/category/?token=${accessToken}`, payload);
  return response;
});

export const deleteC = createAsyncThunk('deleteC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/category/delete?token=${accessToken}`, payload);
  return response;
});

const groupCategorySlice = createSlice({
  name: 'groupsCategories',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listG.pending]: (state) => {
      state.status = 'loading';
    },
    [listG.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for groups';
      }

      return {
        ...state,
        groupList: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listG.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },

    [listC.pending]: (state) => {
      state.status = 'loading';
    },
    [listC.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = 'No data retrieved for categories';
      }

      return {
        ...state,
        categoryList: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listC.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = groupCategorySlice.actions;
export default groupCategorySlice.reducer;

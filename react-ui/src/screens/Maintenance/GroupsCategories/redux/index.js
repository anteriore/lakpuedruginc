import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { message as Message } from 'antd';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  groupList: null,
  categoryList: null,
  status: '',
  statusMessage: '',
  action: '',
};

export const listG = createAsyncThunk('listG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/group/company/${payload.company}?token=${accessToken}`
  );
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

export const listC = createAsyncThunk('listC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/category/?token=${accessToken}`);
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
      if (typeof action.payload !== 'undefined' && action.payload.status === 200) {
        const { data } = action.payload;
        let statusMessage = message.ITEMS_GET_FULFILLED;

        if (data.length === 0) {
          statusMessage = 'No data retrieved for groups';
          Message.warning(statusMessage);
        }

        return {
          ...state,
          groupList: data,
          status: 'succeeded',
          action: 'get',
          statusMessage,
        };
      }

      Message.error(message.ITEMS_GET_REJECTED);
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listG.rejected]: (state) => {
      state.status = 'failed';
    },

    [listC.pending]: (state) => {
      state.status = 'loading';
    },
    [listC.fulfilled]: (state, action) => {
      if (typeof action.payload !== 'undefined' && action.payload.status === 200) {
        const { data } = action.payload;
        let statusMessage = message.ITEMS_GET_FULFILLED;

        if (data.length === 0) {
          statusMessage = 'No data retrieved for categories';
          Message.warning(statusMessage);
        }

        return {
          ...state,
          categoryList: data,
          status: 'succeeded',
          action: 'get',
          statusMessage,
        };
      }

      Message.error(message.ITEMS_GET_REJECTED);
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listC.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = groupCategorySlice.actions;
export default groupCategorySlice.reducer;

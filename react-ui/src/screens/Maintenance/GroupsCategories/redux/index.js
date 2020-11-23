import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
  groupList: null,
  categoryList: null,
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

  const response = await axiosInstance.post(
    `rest/group/delete?token=${accessToken}`,
    payload
  );
  return response;
});

export const listC = createAsyncThunk('listC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/category/?token=${accessToken}`
  );
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
  reducers: {},
  extraReducers: {
    [listG.pending]: (state) => {
      state.status = 'loading';
    },
    [listG.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.groupList = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listG.rejected]: (state) => {
      state.status = 'failed';
    },

    [listC.pending]: (state) => {
      state.status = 'loading';
    },
    [listC.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.categoryList = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listC.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export default groupCategorySlice.reducer;

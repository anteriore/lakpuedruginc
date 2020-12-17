import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
  list: null,
};

export const listRecipe = createAsyncThunk('listRecipe', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(`rest/recipes/?token=${accessToken}`);
  return response;
});

export const addRecipe = createAsyncThunk('addRecipe', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/recipes/?token=${accessToken}`, payload);
  return response;
});

export const deleteRecipe = createAsyncThunk('deleteRecipe', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/recipes/delete?token=${accessToken}`, payload);
  return response;
});

export const getRecipe = createAsyncThunk('getRecipe', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(
    `rest/clients/${payload.id}?token=${accessToken}`
  );
  return response;
});

const recipeSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    clearData(state, action) {
      state.list = null
    },
  },
  extraReducers: {
    [listRecipe.pending]: (state, action) => {
      state.status = 'loading';
    },
    [listRecipe.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.list = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listRecipe.rejected]: (state, action) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = recipeSlice.actions;
export default recipeSlice.reducer;

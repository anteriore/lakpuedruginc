import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  groupList: [],
  categoryList: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listG = createAsyncThunk('listG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try{
    const response = await axiosInstance.get(
      `rest/group/company/${payload.company}?token=${accessToken}`
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

export const addG = createAsyncThunk('addG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try{
    const response = await axiosInstance.post(`rest/group/?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateG = createAsyncThunk('updateG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try{
    const response = await axiosInstance.post(`rest/group/?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const deleteG = createAsyncThunk('deleteG', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`rest/group/delete?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const listC = createAsyncThunk('listC', async (payload, thunkAPI, rejectWithValue) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(`rest/category/?token=${accessToken}`);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const addC = createAsyncThunk('addC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try{
    const response = await axiosInstance.post(`rest/category/?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

      if (valid) {
        return validatedResponse;
      }
      return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const updateC = createAsyncThunk('updateC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try{
    const response = await axiosInstance.post(`rest/category/?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

      if (valid) {
        return validatedResponse;
      }
      return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
  }
});

export const deleteC = createAsyncThunk('deleteC', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`rest/category/delete?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

      if (valid) {
        return validatedResponse;
      }
      return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
  }
});

const groupCategorySlice = createSlice({
  name: 'groupsCategories',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listG.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for groups`
      }
    },
    [listG.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Groups',
        state.action
      );

      return {
        ...state,
        groupList: data,
        status: 'succeeded',
        statusLevel: level, 
        responseCode: status, 
        statusMessage,
      };
    },
    [listG.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Groups',
        state.action
      );

      return {
        ...state,
        groupList: [],
        status: 'succeeded',
        statusLevel: level, 
        responseCode: status, 
        statusMessage,
      };
    },
    [addG.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusMessage: `${message.ITEM_ADD_PENDING} for groups`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [addG.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Groups',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [addG.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Groups',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },    
    [updateG.pending]: (state) => {
      return {
        ...state,
        action: 'update',
        status: 'loading',
        statusMessage: `${message.ITEM_UPDATE_PENDING} for groups`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [updateG.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Groups',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [updateG.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Groups',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [deleteG.pending]: (state) => {
      return {
        ...state,
        action: 'delete',
        status: 'loading',
        statusMessage: `${message.ITEM_DELETE_PENDING} for groups`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [deleteG.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Groups',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [deleteG.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Groups',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },

    [listC.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for departments`
      }
    },
    [listC.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Category',
        state.action
      );

      return {
        ...state,
        categoryList: data,
        status: 'succeeded',
        statusLevel: level, 
        responseCode: status, 
        statusMessage,
      };
    },
    [listC.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Category',
        state.action
      );

      return {
        ...state,
        categoryList: [],
        status: 'succeeded',
        statusLevel: level, 
        responseCode: status, 
        statusMessage,
      };
    },
    [addC.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusMessage: `${message.ITEM_ADD_PENDING} for categories`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [addC.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Category',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [addC.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Category',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },    
    [updateC.pending]: (state) => {
      return {
        ...state,
        action: 'update',
        status: 'loading',
        statusMessage: `${message.ITEM_UPDATE_PENDING} for categories`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [updateC.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Category',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [updateC.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Category',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [deleteC.pending]: (state) => {
      return {
        ...state,
        action: 'delete',
        status: 'loading',
        statusMessage: `${message.ITEM_DELETE_PENDING} for categories`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [deleteC.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Category',
        state.action
      );

      return {
        ...state,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [deleteC.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Category',
        state.action
      );

      return {
        ...state,
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
  },
});

export const { clearData } = groupCategorySlice.actions;
export default groupCategorySlice.reducer;

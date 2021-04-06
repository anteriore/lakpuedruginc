import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { checkResponseValidity, generateStatusMessage } from '../../../../helpers/general-helper';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  deptList: [],
  areaList: [],
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const listD = createAsyncThunk('listD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.get(
      `rest/departments/company/${payload.company}?token=${accessToken}`
    );
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

export const addD = createAsyncThunk('addD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`rest/departments/?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

export const updateD = createAsyncThunk('updateD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`rest/departments/?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

export const deleteD = createAsyncThunk('deleteD', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(
      `rest/departments/delete?token=${accessToken}`,
      payload
    );
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

export const listA = createAsyncThunk('listA', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try{
    const response = await axiosInstance.get(
      `rest/areas/company/${payload.company}?token=${accessToken}`
    );
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

export const addA = createAsyncThunk('addA', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`rest/areas/?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

export const updateA = createAsyncThunk('updateA', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`rest/areas/?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

export const deleteA = createAsyncThunk('deleteA', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  try {
    const response = await axiosInstance.post(`rest/areas/delete?token=${accessToken}`, payload);
    const { response: validatedResponse, valid } = checkResponseValidity(response);

    if (valid) {
      return validatedResponse;
    }
    return thunkAPI.rejectWithValue(validatedResponse);
  } catch (err) {
    return thunkAPI.rejectWithValue({
      status: null,
      data: null,
      statusText: 'failed. An error has occurred'
    });
  }
});

const departmentAreaSlice = createSlice({
  name: 'departmentArea',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listD.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for departments`
      }
    },
    [listD.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Departments',
        state.action
      );

      return {
        ...state,
        deptList: data,
        status: 'succeeded',
        statusLevel: level, 
        responseCode: status, 
        statusMessage,
      };
    },
    [listD.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Departments',
        state.action
      );

      return {
        ...state,
        deptList: [],
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [addD.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEM_ADD_PENDING} for departments`,
        responseCode: null,
      };
    },
    [addD.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Departments',
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
    [addD.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Departments',
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
    [updateD.pending]: (state) => {
      return {
        ...state,
        action: 'update',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEM_UPDATE_PENDING} for departments`,
        responseCode: null,
      };
    },
    [updateD.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Departments',
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
    [updateD.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Departments',
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
    [deleteD.pending]: (state) => {
      return {
        ...state,
        action: 'delete',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEM_DELETE_PENDING} for departments`,
        responseCode: null,
      };
    },
    [deleteD.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Departments',
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
    [deleteD.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Departments',
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

    [listA.pending]: (state) => {
      return {
        ...state,
        action: 'fetch',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEMS_GET_PENDING} for areas`
      }
    },
    [listA.fulfilled]: (state, action) => {
      const { data, status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Areas',
        state.action
      );

      return {
        ...state,
        areaList: data,
        status: 'succeeded',
        statusLevel: level, 
        responseCode: status, 
        statusMessage,
      };
    },
    [listA.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Areas',
        state.action
      );

      return {
        ...state,
        areasList: [],
        status: 'failed',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [addA.pending]: (state) => {
      return {
        ...state,
        action: 'create',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEM_ADD_PENDING} for areas`,
        responseCode: null,
      };
    },
    [addA.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Areas',
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
    [addA.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Areas',
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
    [updateA.pending]: (state) => {
      return {
        ...state,
        action: 'update',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEM_UPDATE_PENDING} for areas`,
        responseCode: null,
      };
    },
    [updateA.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Areas',
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
    [updateA.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Area',
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
    [deleteA.pending]: (state) => {
      return {
        ...state,
        action: 'delete',
        status: 'loading',
        statusLevel: '',
        statusMessage: `${message.ITEM_DELETE_PENDING} for areas`,
        responseCode: null,
      };
    },
    [deleteA.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Areas',
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
    [deleteA.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Areas',
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

export const { clearData } = departmentAreaSlice.actions;
export default departmentAreaSlice.reducer;

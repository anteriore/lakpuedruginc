import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axios-instance';
import * as message from '../../data/constants/response-message.constant';
import { checkResponseValidity, generateStatusMessage } from '../../helpers/general-helper';

const initialState = {
  signedIn: false,
  token: '',
  expired: false,
  user: null,
  permissions: null,
  messsage: null,
  status: 'loading',
  statusLevel: '',
  responseCode: null,
  statusMessage: '',
  action: '',
};

export const login = createAsyncThunk('login', async (payload, thunkAPI) => {
  const data = {
    username: payload.username,
    password: payload.password,
  };
  try {
    const response = await axiosInstance.post('api/login', data);
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

export const getUser = createAsyncThunk('getUser', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.get(`rest/me/?token=${accessToken}`);
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

export const changePassword = createAsyncThunk('changePassword', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  try {
    const response = await axiosInstance.post(`rest/users/password/?token=${accessToken}`, payload);
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

const processUserData = (data) => {
  const processedData = {
    id: data.id,
    email: data.email,
    username: data.username,
    firstName: data.firstName,
    lastName: data.lastName,
    middleInitial: data.middleInitial,
    company: data.company,
    department: data.department,
    employeeType: data.employeeType,
  };

  return processedData;
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    updateAuthState(state, action) {
      state.signedIn = action.payload.signedIn;
      state.token = action.payload.token;
      state.expired = action.payload.expired;
    },
    resetErrorMsg(state) {
      state.message = null;
      state.status =  'loading'
      state.statusLevel = ''
      state.responseCode = null
      state.statusMessage = ''
      state.action = ''
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      return {
        ...state,
        action: 'login',
        status: 'loading',
        statusMessage: `Authenticating User`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [login.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Authentication',
        state.action
      );
      return {
        ...state,
        token: action.payload.data.token,
        expired: action.payload.data.expired,
        signedIn: true,
        status: 'succeeded',
        statusLevel: level,
        responseCode: status,
        statusMessage,
      };
    },
    [login.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Authentication',
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
    [getUser.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        return {
          ...state,
          user: processUserData(action.payload.data, action.type),
          permissions: action.payload.data.permissions,
        };
      }
    },
    
    [changePassword.pending]: (state) => {
      return {
        ...state,
        action: 'password change',
        status: 'loading',
        statusMessage: `Changing Password`,
        statusLevel: '',
        responseCode: null,
      };
    },
    [changePassword.fulfilled]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Authentication',
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
    [changePassword.rejected]: (state, action) => {
      const { status } = action.payload;
      const { message: statusMessage, level } = generateStatusMessage(
        action.payload,
        'Authentication',
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

export const { updateAuthState, resetErrorMsg, logout } = authSlice.actions;

export default authSlice.reducer;

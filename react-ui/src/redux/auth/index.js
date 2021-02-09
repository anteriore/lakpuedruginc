import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../utils/axios-instance';

const initialState = {
  signedIn: false,
  token: '',
  expired: false,
  user: null,
  permissions: null,
  messsage: null,
};

export const login = createAsyncThunk('login', async (payload) => {
  const data = {
    username: payload.username,
    password: payload.password,
  };

  const response = await axiosInstance.post('api/login', data);
  return response;
});

export const getUser = createAsyncThunk('getUser', async (args, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/me/?token=${accessToken}`);
  return response;
});

export const changePassword = createAsyncThunk('changePassword', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;
  const data = {
    id: payload.id,
    password: payload.password,
  };

  const response = await axiosInstance.post(`rest/users/password/?token=${accessToken}`, data);
  return response;
});

/* export const logout = createAsyncThunk('logout', async (payload) => {
    
    const response = await axiosInstance.post('api/logout')
    return response

})
*/

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
    updateAuthState(state, action) {
      state.signedIn = action.payload.signedIn;
      state.token = action.payload.token;
      state.expired = action.payload.expired;
    },
    resetErrorMsg(state) {
      state.message = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = 'loading';
    },
    [login.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        return {
          ...state,
          status: 'succeeded',
          token: action.payload.data.token,
          expired: action.payload.data.expired,
          signedIn: true,
          message: 'Login Successful',
        };
      }
      if (typeof action.payload === 'undefined') {
        return {
          ...state,
          status: 'failed',
          message: 'Unable to connect to server',
        };
      }

      return {
        ...state,
        status: 'failed',
        message: 'Invalid username and/or password',
      };
    },
    [login.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        message: 'Invalid username and/or password',
      };
    },

    [getUser.pending]: (state) => {
      state.status = 'loading';
    },
    [getUser.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        return {
          ...state,
          status: 'succeeded',
          message: null,
          user: processUserData(action.payload.data, action.type),
        };
      }

      return {
        ...state,
        status: 'failed',
        message: 'Unable get user info',
      };
    },
    [getUser.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        message: 'Unable get user info',
      };
    },

    [changePassword.pending]: (state) => {
      state.status = 'loading';
    },
    [changePassword.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        return {
          ...state,
          status: 'succeeded',
          message: 'Password change successful',
        };
      }
      if (typeof action.payload === 'undefined') {
        return {
          ...state,
          status: 'failed',
          message: 'Unable to connect to server',
        };
      }

      return {
        ...state,
        status: 'failed',
        message: 'Password change request was denied',
      };
    },
    [changePassword.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        message: 'Password change request was denied',
      };
    },
  },
});

export const { updateAuthState, resetErrorMsg } = authSlice.actions;

export default authSlice.reducer;

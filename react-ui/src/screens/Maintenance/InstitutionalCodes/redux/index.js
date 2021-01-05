import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

export const listInstitution = createAsyncThunk('listInstitution', async (payload, thunkAPI, rejectWithValue) => {
  const accessToken = thunkAPI.getState().auth.token;
  const response = await axiosInstance.get(`/rest/institutional-codes?token=${accessToken}`);
  
  if(typeof response !== 'undefined' && response.status === 200){
    const { data } = response;
    if( data.length === 0){
      payload.message.warning("No data retrieved for institutional codes")
    }
  }
  else {
    payload.message.error(message.ITEMS_GET_REJECTED)
    return rejectWithValue(response)
  }


  return response;
});

export const createInstitution = createAsyncThunk(
  'createInstitution',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post(
      `/rest/institutional-codes?token=${accessToken}`,
      payload
    );

    return response;
  }
);

export const updateInstitution = createAsyncThunk(
  'updateInstitution',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post(
      `/rest/institutional-codes?token=${accessToken}`,
      payload
    );

    return response;
  }
);

export const deleteInstitution = createAsyncThunk(
  'deleteInstitution',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { id } = payload;
    const response = await axiosInstance.post(
      `/rest/institutional-codes/delete?token=${accessToken}`,
      id
    );

    return response;
  }
);
const initialState = {
  institutionList: [],
  status: '',
  statusMessage: '',
  action: '',
}
const institutionalCodesSlice = createSlice({
  name: 'institutionalCodes',
  initialState: initialState,
  reducers: {
    clearData: () => initialState
  },
  extraReducers: {
    [listInstitution.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listInstitution.fulfilled]: (state, action) => {
      const { data } = action.payload;
      var statusMessage = message.ITEMS_GET_FULFILLED

      if( data.length === 0){
        statusMessage = "No data retrieved for institutional codes"
      }

      return {
        ...state,
        institutionList: data,
        status: 'succeeded',
        action: 'get',
        statusMessage: statusMessage,
      };
    },
    [listInstitution.rejected]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        institutionList: data,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [createInstitution.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_ADD_PENDING,
      };
    },
    [createInstitution.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_ADD_FULFILLED,
      };
    },
    [createInstitution.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_ADD_REJECTED,
      };
    },
    [updateInstitution.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_UPDATE_PENDING,
      };
    },
    [updateInstitution.fulfilled]: (state) => {
      return {
        ...state,
        status: 'succeeded',
        action: 'post',
        statusMessage: message.ITEM_UPDATE_FULFILLED,
      };
    },
    [updateInstitution.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_UPDATE_REJECTED,
      };
    },
    [deleteInstitution.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_DELETE_PENDING,
      };
    },
    [deleteInstitution.fulfilled]: (state) => {
      return {
        ...state,
        status: 'succeeded',
        action: 'post',
        statusMessage: message.ITEM_DELETE_FULFILLED,
      };
    },
    [deleteInstitution.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
  },
});

export const { clearData } = institutionalCodesSlice.actions;
export default institutionalCodesSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
  list: null,
};

export const listPDCDisbursement = createAsyncThunk('listPDCDisbursement', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/pdc-disbursements?token=${accessToken}`);
  return response;
});

export const addPDCDisbursement = createAsyncThunk('addPDCDisbursement', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/pdc-disbursements/?token=${accessToken}`, payload);
  return response;
});

export const deletePDCDisbursement = createAsyncThunk('deletePDCDisbursement', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(`rest/pdc-disbursements/delete?token=${accessToken}`, payload);
  return response;
});

const PDCDisbursementSlice = createSlice({
  name: 'PDCDisbursements',
  initialState,
  reducers: {
    clearData(state, action) {
      state.list = null
    },
  },
  extraReducers: {
    [listPDCDisbursement.pending]: (state) => {
      state.status = 'loading';
    },
    [listPDCDisbursement.fulfilled]: (state, action) => {
      if (action.payload !== undefined && action.payload.status === 200) {
        state.status = 'succeeded';
        state.list = action.payload.data;
      } else {
        state.status = 'failed';
      }
    },
    [listPDCDisbursement.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { clearData } = PDCDisbursementSlice.actions;
export default PDCDisbursementSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

const initialState = {
  list: null,
  status: '',
  statusMessage: '',
  action: '',
};

const noDataMessage = 'No data retrieved for acknowledgement receipts';

export const listAReceipt = createAsyncThunk('listAReceipt', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.get(`rest/acknowledgement-receipts?token=${accessToken}`);

  if (typeof response !== 'undefined') {
    const { status } = response;
    if (status === 200) {
      if (response.data.length === 0) {
        response.statusText = `${message.API_200_EMPTY} in acknowledgement receipt.`;
      } else {
        response.statusText = `${message.API_200_SUCCESS} in acknowledgement receipt.`;
      }
      return response;
    }

    if (status === 500 || status === 400) {
      return thunkAPI.rejectWithValue(response);
    }
  } else {
    return thunkAPI.rejectWithValue({
      status: 'error',
    });
  }

  return response;
});

export const listAReceiptByDepot = createAsyncThunk(
  'listAReceiptByDepot',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.get(
      `rest/acknowledgement-receipts/depot/${payload.depot}?token=${accessToken}`
    );

    if (typeof response !== 'undefined' && response.status === 200) {
      const { data } = response;
      if (data.length === 0) {
        payload.message.warning(`${noDataMessage} from the selected depot`);
      }
    } else {
      payload.message.error(message.ITEMS_GET_REJECTED);
      return thunkAPI.rejectWithValue(response);
    }

    return response;
  }
);

export const listAReceiptWithSIByDepot = createAsyncThunk(
  'listAReceiptWithSIByDepot',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;

    const response = await axiosInstance.get(
      `rest/acknowledgement-receipts/depot/${payload.depot}/with-si?token=${accessToken}`
    );

    if (typeof response !== 'undefined' && response.status === 200) {
      const { data } = response;
      if (data.length === 0) {
        payload.message.warning(
          `${noDataMessage} with an associated sales invoice from the selected depot`
        );
      }
    } else {
      payload.message.error(message.ITEMS_GET_REJECTED);
      return thunkAPI.rejectWithValue(response);
    }

    return response;
  }
);

export const addAReceipt = createAsyncThunk('addAReceipt', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/acknowledgement-receipts/?token=${accessToken}`,
    payload
  );
  return response;
});

export const deleteAReceipt = createAsyncThunk('deleteAReceipt', async (payload, thunkAPI) => {
  const accessToken = thunkAPI.getState().auth.token;

  const response = await axiosInstance.post(
    `rest/acknowledgement-receipts/delete?token=${accessToken}`,
    payload
  );
  return response;
});

const acknowledgementReceiptSlice = createSlice({
  name: 'acknowledgementReceipts',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listAReceipt.pending]: (state) => {
      state.status = 'loading';
    },
    [listAReceipt.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = noDataMessage;
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listAReceipt.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listAReceiptByDepot.pending]: (state) => {
      state.status = 'loading';
    },
    [listAReceiptByDepot.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = `${noDataMessage} from the selected depot`;
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listAReceiptByDepot.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [listAReceiptWithSIByDepot.pending]: (state) => {
      state.status = 'loading';
    },
    [listAReceiptWithSIByDepot.fulfilled]: (state, action) => {
      const { data } = action.payload;
      let statusMessage = message.ITEMS_GET_FULFILLED;

      if (data.length === 0) {
        statusMessage = `${noDataMessage} with an associated sales invoice from the selected depot`;
      }

      return {
        ...state,
        list: data,
        status: 'succeeded',
        action: 'get',
        statusMessage,
      };
    },
    [listAReceiptWithSIByDepot.rejected]: (state) => {
      return {
        ...state,
        status: 'failed',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
  },
});

export const { clearData } = acknowledgementReceiptSlice.actions;
export default acknowledgementReceiptSlice.reducer;

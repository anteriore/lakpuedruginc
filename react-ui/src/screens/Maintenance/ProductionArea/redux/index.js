import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { message as Message } from 'antd';
import axiosInstance from '../../../../utils/axios-instance';
import * as message from '../../../../data/constants/response-message.constant';

export const listProductionArea = createAsyncThunk(
  'listProductionArea',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.get(`/rest/procedure-areas?token=${accessToken}`);

    return response;
  }
);

export const createProductionArea = createAsyncThunk(
  'createProductionArea',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post(
      `/rest/procedure-areas?token=${accessToken}`,
      payload
    );

    return response;
  }
);

export const updateProductionArea = createAsyncThunk(
  'updateProductionArea',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const response = await axiosInstance.post(
      `/rest/procedure-areas?token=${accessToken}`,
      payload
    );

    return response;
  }
);

export const deleteProductionArea = createAsyncThunk(
  'deleteProductionArea',
  async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token;
    const { id } = payload;
    const response = await axiosInstance.post(
      `/rest/procedure-areas/delete?token=${accessToken}`,
      id
    );

    return response;
  }
);

const initialState = {
  productionAreaList: [],
  status: '',
  statusMessage: '',
  action: '',
};

const productionAreaSlice = createSlice({
  name: 'productionArea',
  initialState,
  reducers: {
    clearData: () => initialState,
  },
  extraReducers: {
    [listProductionArea.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'get',
        statusMessage: message.ITEMS_GET_PENDING,
      };
    },
    [listProductionArea.fulfilled]: (state, action) => {
      if (typeof action.payload !== 'undefined' && action.payload.status === 200) {
        const { data } = action.payload;
        let statusMessage = message.ITEMS_GET_FULFILLED;

        if (data.length === 0) {
          statusMessage = 'No data retrieved for production areas';
          Message.warning(statusMessage);
        }

        return {
          ...state,
          productionAreaList: data,
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
    [listProductionArea.rejected]: (state, action) => {
      const { data } = action.payload;
      return {
        ...state,
        productionAreaList: data,
        status: 'Error',
        action: 'get',
        statusMessage: message.ITEMS_GET_REJECTED,
      };
    },
    [createProductionArea.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_ADD_PENDING,
      };
    },
    [createProductionArea.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_ADD_FULFILLED,
      };
    },
    [createProductionArea.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_ADD_REJECTED,
      };
    },
    [updateProductionArea.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_UPDATE_PENDING,
      };
    },
    [updateProductionArea.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_UPDATE_FULFILLED,
      };
    },
    [updateProductionArea.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_UPDATE_REJECTED,
      };
    },
    [deleteProductionArea.pending]: (state) => {
      return {
        ...state,
        status: 'loading',
        action: 'pending',
        statusMessage: message.ITEM_DELETE_PENDING,
      };
    },
    [deleteProductionArea.fulfilled]: (state) => {
      return {
        ...state,
        status: 'Fulfilled',
        action: 'post',
        statusMessage: message.ITEM_DELETE_FULFILLED,
      };
    },
    [deleteProductionArea.rejected]: (state) => {
      return {
        ...state,
        status: 'Error',
        action: 'error',
        statusMessage: message.ITEM_DELETE_REJECTED,
      };
    },
  },
});

export const { clearData } = productionAreaSlice.actions;
export default productionAreaSlice.reducer;

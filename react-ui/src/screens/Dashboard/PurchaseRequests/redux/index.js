import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
    listData: [],
    itemData: null
}

export const list = createAsyncThunk('list', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token
    const config = {
        headers: {
          'Authorization': accessToken
        }
    }

    const response = await axiosInstance.get('rest/purchase-requests/company/' + payload.company, config)
    return response

})

export const get = createAsyncThunk('get', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token
    const config = {
        headers: {
          'Authorization': accessToken
        }
    }

    const response = await axiosInstance.get('rest/purchase-requests/' + payload.id, config)
    return response

})

const processData = (data, action) => {

    if(action === "list/fulfilled"){
        var processedData = []
        for(const [index, value] of data.entries()){
            var item = {
                id: value.id,
                number: value.number,
                date: moment(new Date(value.date)).format("DD/MM/YYYY"),
                dateNeeded: moment(new Date(value.date)).format("DD/MM/YYYY"),
                department: value.department,
                remarks: value.remarks,
                requestedBy: value.requestedBy.email,
                status: value.status,
            }
            processedData.push(item)
        }
    }
    else if(action === "get/fulfilled"){
        var requestedItems = []
        for(const [index, value] of data.requestedItems.entries()){
            var item = {
                id: value.id,
                type: value.item.type.name,
                code: value.item.code,
                name: value.item.name,
                unit: value.item.unit.code,
                stocks: value.quantityRemaining,
                purchase_request: null,
                purchase_order: null,
                quarantined: null,
            }
            requestedItems.push(item)
        }
        
        processedData = {
            id: data.id,
            number: data.number,
            date: moment(new Date(data.date)).format("DD/MM/YYYY"),
            dateNeeded: moment(new Date(data.date)).format("DD/MM/YYYY"),
            department: data.department,
            remarks: data.remarks,
            requestedBy: data.requestedBy.email,
            status: data.status,
            requestedItems: requestedItems,
        }
    }

    
    return processedData
}

const purchaseRequestSlice = createSlice({
    name: 'purchaseRequest',
    initialState,
    reducers: {
        resetItemData(state, action) {
            state.itemData = null
        }
    },
    extraReducers: {
        [list.pending]: (state, action) => {
            state.status = 'loading'
        },
        [list.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.listData = processData(action.payload.data, action.type)
        },
        [list.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },
        [get.pending]: (state, action) => {
            state.status = 'loading'
        },
        [get.fulfilled]: (state, action) => {
            state.status = 'succeeded'
            state.itemData = processData(action.payload.data, action.type)
        },
        [get.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        }
    },
})
export const { resetItemData } = purchaseRequestSlice.actions

export default purchaseRequestSlice.reducer
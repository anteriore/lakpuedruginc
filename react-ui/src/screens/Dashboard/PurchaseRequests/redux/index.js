/* eslint-disable no-redeclare, no-unused-vars, no-dupe-keys*/
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../../../utils/axios-instance';

const initialState = {
    listData: [],
    itemData: {
        id: null,
        number: null,
        date: null,
        dateNeeded: null,
        department: null,
        remarks: null,
        requestedBy: null,
        status: null,
        requestedItems: [],
    }
}

export const listPR = createAsyncThunk('listPR', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token

    const response = await axiosInstance.get('rest/purchase-requests/company/' + payload.company + "?token=" + accessToken)
    return response

})

export const listItems = createAsyncThunk('listItems', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token

    const response = await axiosInstance.get("rest/items?token=" + accessToken)
    return response

})

export const getPR = createAsyncThunk('getPR', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token

    const response = await axiosInstance.get('rest/purchase-requests/' + payload.id + "?token=" + accessToken)
    return response

})

export const addPR = createAsyncThunk('addPR', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token
    
    const response = await axiosInstance.post('rest/purchase-requests/?token=' + accessToken, payload)
    return response

})

export const deletePR = createAsyncThunk('deletePR', async (payload, thunkAPI) => {
    const accessToken = thunkAPI.getState().auth.token
    
    const response = await axiosInstance.post('rest/purchase-requests/delete?token=' + accessToken, payload)
    return response

})

const processData = (data, action) => {

    if(action === "listPR/fulfilled"){
        var processedData = []
        for(const [index, value] of data.entries()){
            var item = {
                id: value.id,
                number: value.number,
                date: value.date,
                dateNeeded: value.dateNeeded,
                department: value.department !== null ? (value.department.name) : (""),
                remarks: value.remarks,
                requestedBy: value.requestedBy.email,
                status: value.status,
            }
            processedData.push(item)
        }
    }
    else if(action === "getPR/fulfilled"){
        var requestedItems = []
        for(const [index, value] of data.requestedItems.entries()){
            var item = {
                id: value.item.id,
                code: value.item.code,
                name: value.item.name,
                unit: {
                    id: value.item.unit.id,
                    name: value.item.unit.name,
                },
                type: {
                    id: value.item.type.id,
                    code: value.item.type.code,
                    name: value.item.type.name,
                },
                stocks: value.quantityRemaining,
                quantityRequested: value.quantityRequested,
                purchase_request: null,
                purchase_order: null,
                quarantined: null,
            }
            requestedItems.push(item)
        }

        processedData = {
            id: data.id,
            number: data.number,
            date: data.date,
            dateNeeded: data.dateNeeded,
            department: data.department,
            remarks: data.remarks,
            requestedBy: data.requestedBy.email,
            status: data.status,
            requestedItems: requestedItems,
        }
    }
    else if(action === "listItems/fulfilled"){
        var processedData = []
        for(const [index, value] of data.entries()){
            var item = {
                id: value.id,
                name: value.name,
                code: value.code,
                type: value.type,
                unit: {
                    id: value.unit.id,
                    name: value.unit.name,
                },
                type: {
                    id: value.type.id,
                    code: value.type.code,
                    name: value.type.name,
                }
            }

            processedData.push(item)
        }
    }

    
    return processedData
}

const purchaseRequestSlice = createSlice({
    name: 'purchaseRequest',
    initialState,
    reducers: {
        resetItemData(state, action) {
            state.itemData = {
                id: null,
                number: null,
                date: null,
                dateNeeded: null,
                department: null,
                remarks: null,
                requestedBy: null,
                status: null,
                requestedItems: [],
            }
        }
    },
    extraReducers: {
        [listPR.pending]: (state, action) => {
            state.status = 'loading'
        },
        [listPR.fulfilled]: (state, action) => {
            if(action.payload !== undefined && action.payload.status === 200){
                state.status = 'succeeded'
                state.listData = processData(action.payload.data, action.type)
            }
            else{
                state.status = 'failed'
            }
        },
        [listPR.rejected]: (state, action) => {
            state.status = 'failed'
        },


        [getPR.pending]: (state, action) => {
            state.status = 'loading'
        },
        [getPR.fulfilled]: (state, action) => {
            if(action.payload !== undefined && action.payload.status === 200){
                state.status = 'succeeded'
                state.itemData = processData(action.payload.data, action.type)
            }
            else{
                state.status = 'failed'
            }
        },
        [getPR.rejected]: (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        },


        [listItems.pending]: (state, action) => {
            state.status = 'loading'
        },
        [listItems.fulfilled]: (state, action) => {
            if(action.payload !== undefined && action.payload.status === 200){
                state.status = 'succeeded'
                state.listData = processData(action.payload.data, action.type)
            }
            else{
                state.status = 'failed'
            }
        },
        [listItems.rejected]: (state, action) => {
            state.status = 'failed'
        },
    },
})
export const { resetItemData } = purchaseRequestSlice.actions

export default purchaseRequestSlice.reducer
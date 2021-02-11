import { useDispatch, useSelector } from 'react-redux';
import { getRequestedQuantityByItem } from '../redux';
import { getOrderedQuantityByItem } from '../../../Purchasing/redux';
import moment from 'moment';

export const processDataForSubmission = (data, company) => {
    const requestedItems = []
    data.requestedItems.forEach((item) => {
        requestedItems.push({
            id: item.id || null,
            item: {
                id: item.itemID
            },
            unit: {
                id: item.unit.id
            },
            quantityRequested: item.quantityRequested,
            company: {
                id: company
            },
        })
    })
    return {
        ...data,
        department: {
            id: data.department
        },
        company: {
            id: company
        },
        requestedItems
    }
}

export const loadDataForUpdate = (data) => {
    const requestedItems = []
    data.requestedItems.forEach((item) => {
        requestedItems.push({
            ...item,
            ...item.item,
            id: item.id,
            itemID: item.item.id,
        })
    })
    return {
        ...data,
        date: moment(new Date(data.date)) || moment(),
        dateNeeded: moment(new Date(data.dateNeeded)) || moment(),
        department: data.department !== null ? data.department.id : null,
        requestedItems: requestedItems
    };
}

const Helper = () => {
    const dispatch = useDispatch();
    const company = useSelector((state) => state.company.selectedCompany);

    const processItemSummaryData = (itemData) => {
        const processedData = []
        var requestedQuantity, orderedQuantity, quarantinedQuantity

        //TODO: FIX ASYNC EXECUTION
        itemData.forEach((item) => {
            requestedQuantity = 0
            orderedQuantity = 0
            quarantinedQuantity = 0
            dispatch(getRequestedQuantityByItem({company, item: item.id})).then((response) => {
                requestedQuantity = response.payload.data
                dispatch(getOrderedQuantityByItem({company, item: item.id})).then((response) => {
                    orderedQuantity = response.payload.data
                    processedData.push({
                        ...item,
                        requestedQuantity,
                        orderedQuantity,
                    })
                })
            })
            
        });

        return processedData
    }
    return {
        processItemSummaryData,
    }
}

export default Helper


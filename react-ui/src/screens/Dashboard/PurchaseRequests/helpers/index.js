import { useDispatch, useSelector } from 'react-redux';
import { getRequestedQuantityByItem } from '../redux';
import { getOrderedQuantityByItem } from '../../../Purchasing/redux';

export const processDataForSubmission = (data, company) => {
    const requestedItems = []
    data.requestedItems.forEach((item) => {
        requestedItems.push({
            item: {
                id: item.id
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
                dispatch(getRequestedQuantityByItem({company, item: item.id})).then((response) => {
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


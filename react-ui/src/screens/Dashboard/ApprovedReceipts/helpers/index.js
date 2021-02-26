export const formatPayload = (approvalId, company, data) => {  
    return {
        ...data,
        number: data.number,
        date: data.date,
        receivedBy: { id: approvalId },
        company: { id: company },
        maxContainers: data.maxContainers,
        specifiedGravity: data.specifiedGravity,
        dateCreated: data.dateCreated,
        modified: data.modified,
        receivingReceipt: { id: data.receivingReceipt },

        receivedQuantity: data.receivedItems[0].receivedQuantity,
        approvedQuantity: data.receivedItems[0].approvedQuantity,
        rejectedQuantity: data.receivedItems[0].rejectedQuantity,
        qcSamples: data.receivedItems[0].qcSamples,
        totalQuantity: data.receivedItems[0].totalQuantity,
        expiration: data.receivedItems[0].expiration,
        bestBefore: data.receivedItems[0].bestBefore,
        reevaluation: data.receivedItems[0].reevaluation,
        retest: data.receivedItems[0].retest,

        item: { id: data.receivedItems[0].itemID },
        unit: data.receivedItems[0].unit.code,
        controlNumber: data.controlNumber,
        remarks: data.remarks,
    };
};

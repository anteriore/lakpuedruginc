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

        receivedQuantity: data.receivedQuantity,
        approvedQuantity: data.approvedQuantity,
        rejectedQuantity: data.rejectedQuantity,
        qcSamples: data.qcSamples,
        totalQuantity: data.totalQuantity,
        expiration: data.expiration,
        bestBefore: data.bestBefore,
        reevaluation: data.reevaluation,
        retest: data.retest,

        //item: { id: data.item.id },
        unit: data.item.unit.code,
        controlNumber: data.controlNumber,
        remarks: data.remarks,
    };
};

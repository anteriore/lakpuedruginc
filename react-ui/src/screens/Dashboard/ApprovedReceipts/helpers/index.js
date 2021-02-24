export const formatPayload = (approvalId, company, data) => {
    let formattedValue = {};
  
    formattedValue = {
        ...formattedValue,
        number: data.number,
        receivedBy: { id: approvalId },
        company: { id: company },
        date: data.date,
        controlNumber: data.controlNumber,
        maxContainers: data.maxContainers,
        specifiedGravity: data.specifiedGravity,
        dateCreated: data.dateCreated,
        modified: data.modified,
        remarks: data.remarks,

        receivingReceipt: { id: data.receivingReceipt},
        item: { id: data.item },
        unit: { id: data.item.unit },

        receivedQuantity: data.reveivedQuantity,
        approvedQuantity: data.approvedQuantity,
        rejectedQuantity: data.rejectedQuantity,
        qcSamples: data.qcSamples,
        totalQuantity: data.totalQuantity,
        expiration: data.expiration,
        bestBefore: data.bestBefore,
        reevaluation: data.reevaluation,
        retest: data.retest,
    };
  
    return formattedValue;
};
  
 export const formatPayload = (selectedRR, selectedRRItem, approvalId, company, value) => {
    let formattedValue = {};
  
    formattedValue = {
        ...formattedValue,
        number: value.number,
        date: value.date,
        receivedBy: { id: approvalId },
        company: { id: company },
        date: value.date,
        controlNumber: value.controlNumber,
        maxContainers: value.maxContainers,
        specifiedGravity: value.specifiedGravity,
        remarks: value.remarks,
        dateCreated: value.dateCreated,
        modified: value.modified,
        remarks: value.remarks,

        receivingReceipt: { id: selectedRR },
        item: { id: selectedRRItem },
        unit: { id: selectedRRItem.type },

        receivedQuantity: value.reveivedQuantity,
        approvedQuantity: value.approvedQuantity,
        rejectedQuantity: value.rejectedQuantity,
        qcSamples: value.qcSamples,
        totalQuantity: value.totalQuantity,
        expiration: value.expiration,
        bestBefore: value.bestBefore,
        reevaluation: value.reevaluation,
        retest: value.retest,
    };
  
    return formattedValue;
  };
  
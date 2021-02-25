import _ from 'lodash';

export const formatPayload = (value, list, company) => {
  let formattedValue = {};
  const selectedAR = _.find(list, (o) => o.id === value.controlNumber);

  formattedValue = {
    ...formattedValue,
    approvedReceipt: { id: value.controlNumber },
    reevaluatedBy: { id: selectedAR.receivedBy.id },
    company: { id: company },
    date: value.date,
    expiration: value.expiration,
    retest: value.retest,
    reevaluation: value.reevaluation,
    bestBefore: value.bestBefore,
    extended: value.date,
    allowance: value.allowance,
    remarks: value.remarks,
  };

  return formattedValue;
};

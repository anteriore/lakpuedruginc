import _ from 'lodash';

export const formatProcedurePayload = (rawValues, productionAreaList) => {
  const payload = {
    ...rawValues,
    procedureArea: _.find(productionAreaList, (o) => {
      return o.id === rawValues.procedureArea;
    }),
  };

  return payload;
};

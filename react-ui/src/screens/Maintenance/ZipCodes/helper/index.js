import _ from 'lodash';

export const formatZipPayload = (rawValues, provinceList, regionList) => {
  const payload = {
    ...rawValues,
    provinceCode: _.find(provinceList, (o) => {
      return o.id === rawValues.provinceCode;
    }),
    regionCode: _.find(regionList, (o) => {
      return o.id === rawValues.regionCode;
    }),
  };

  return payload;
};

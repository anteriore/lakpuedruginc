import _ from 'lodash';

export const updateList = (form, choices) => {
  Object.entries(choices).forEach(([key, value]) => {
    if (value !== null) {
      form.form_items.forEach((formItem) => {
        if (formItem.name === key) {
          value.forEach((val) => {
            const { id, code } = val;
            formItem.choices.push({ id, name: code });
          });
        }
        formItem.choices = _.uniqBy(formItem.choices, 'id');
      });
    }
  });
  return form;
};

export const formatPayload = (rawValues, masterList) => {
  Object.entries(masterList).forEach(([key, value]) => {
    if (key === 'finishedGood') {
      delete rawValues.fg_code;
      delete rawValues.fg_name;

      rawValues.finishedGood = value;
    } else {
      rawValues[key] = _.find(value, (o) => {
        return o.id === rawValues[key];
      });
    }
  });

  return rawValues;
};

export const formatInitialFormVal = (rawValues) => {
  const newValue = _.clone(rawValues);
  Object.entries(newValue).forEach(([key, values]) => {
    if (
      typeof values === 'object' &&
      key !== 'company' &&
      key !== 'status' &&
      key !== 'packageDescription'
    ) {
      if (key === 'finishedGood') {
        newValue.fg_code = rawValues.finishedGood.code;
        newValue.fg_name = rawValues.finishedGood.name;
        delete newValue.finishedGood;
      } else {
        newValue[key] = values.id;
      }
    }
  });

  return newValue;
};

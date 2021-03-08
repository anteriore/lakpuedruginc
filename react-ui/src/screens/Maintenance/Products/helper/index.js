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

export const formatPayload = (rawValues, selectedFinishedGoods) => {
  if (rawValues !== null && selectedFinishedGoods !== null) {
    delete rawValues.fg_code;
    delete rawValues.fg_name;
    rawValues.depot = { id: rawValues.depot };
    rawValues.classification = { id: rawValues.classification };
    rawValues.category = { id: rawValues.category };
    rawValues.division = { id: rawValues.division };
    rawValues.smallUnit = { id: rawValues.smallUnit };
    rawValues.bigUnit = { id: rawValues.bigUnit };
    rawValues.finishedGood = { id: selectedFinishedGoods.id };
  }

  return rawValues;
};

export const formatInitialFormVal = (rawValues) => {
  const newValue = _.clone(rawValues);
  Object.entries(newValue).forEach(([key, values]) => {
    /*if (key === 'expiration') {
      newValue[key] = moment(new Date(values));
    }*/

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
      } else if (values !== null) {
        newValue[key] = values.id;
      }
    }
  });

  return newValue;
};

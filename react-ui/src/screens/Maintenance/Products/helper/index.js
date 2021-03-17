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

export const formatPayload = (values) => {
  if ( values?.id !== undefined) {
    return {
      id: values.id,
      company: values.company,
      finishedGood: {id: values.finishedGood},
      depot: {id: values.depot},
      division: {id: values.division},
      bigUnit: {id: values.bigUnit},
      smallUnit: {id: values.smallUnit},
      classification: {id: values.classification},
      category: {id: values.category},
      quantityPerBox: values.quantityPerBox,
      expiration: values.expiration,
      reorderLevel: values.reorderLevel,
      lotNumber: values.lotNumber,
      unitPrice: values.unitPrice
    }
  } else {
    return {
      company: values.company,
      finishedGood: {id: values.finishedGood},
      depot: {id: values.depot},
      division: {id: values.division},
      bigUnit: {id: values.bigUnit},
      smallUnit: {id: values.smallUnit},
      classification: {id: values.classification},
      category: {id: values.category},
      quantityPerBox: values.quantityPerBox,
      expiration: values.expiration,
      reorderLevel: values.reorderLevel,
      lotNumber: values.lotNumber,
      unitPrice: values.unitPrice
    }
  }
};

export const formatInitialValue = (object) => {
  return {
    bigUnit: object?.bigUnit?.id,
    smallUnit: object?.smallUnit?.id,
    category: object?.category?.id,
    classification: object?.classification?.id,
    depot: object?.depot?.id,
    division: object?.division?.id,
    expiration: object?.expiration,
    finishedGood: object?.finishedGood?.id,
    id: object?.id,
    lotNumber: object?.lotNumber,
    quantityPerBox: object?.quantityPerBox,
    reorderLevel: object?.reorderLevel,
    unitPrice: object?.unitPrice
  }
}

import _ from 'lodash';
import moment from 'moment';

// for adding values on list form inputs
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

export const fromatInitForm = (rawValues, fieldNames) => {
  let newField = {};

  fieldNames.forEach(({name, type}) => {
    switch(type){
      case "date":
        newField[name] = moment(new Date(rawValues[name]));
        break;
      case "select": 
        const { id } = rawValues[name];
        newField[name] = id;
        break;
      default:
        newField[name] = rawValues[name];
        break;
    }
  });
  
  return newField;
}
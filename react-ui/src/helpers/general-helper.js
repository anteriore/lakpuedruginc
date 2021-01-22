import _ from 'lodash';
import moment from 'moment';
import * as code from '../data/constants/status-code';

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
  const newField = {};

  fieldNames.forEach(({ name, type }) => {
    switch (type) {
      case 'date':
        newField[name] = moment(new Date(rawValues[name]));
        break;
      case 'select': {
        const { id } = rawValues[name];
        newField[name] = id;
        break;
      }
      default:
        newField[name] = rawValues[name];
        break;
    }
  });

  return newField;
};

export const setConnectionEffect = (response, noDataFoundError, serverError, defaultError) => {
  const { status } = response;
  switch (status) {
    case 200:
      if (response.data.length === 0) {
        noDataFoundError();
      }
      break;
    case 400:
    case 500:
      serverError();
      break;
    default:
      defaultError();
      break;
  }
};

export const checkResponseValidity = (response) => {
  switch(response.status){
    case 200:
      if(response.data.length === 0){
        response.statusText = 'empty'
        return {response, valid: true};
      }else{
        response.statusText = 'succesfull'
        return {response, valid: true};
      }
    case 404:
    case 400:
      response.statusText = 'not existing'
      return {response, valid: false};
    case 500:
      response.statusText = 'something went wrong to the server'
      return {response, valid: false};
    default:
      break
  }
}

export const generateStatusMessage = (payload, currentModule) => {
  const {status, data} = payload;
  switch(status){
    case 200: 
      if (data.length !== 0){
        return {
          level: 'success',
          message: `${code.STATUS_200}: (${currentModule})`
        }
      }else{
        return {
          level: 'warning',
          message: `There's no data in ${currentModule}`
        }
      }
    case 201:
      return {
        level: 'error',
        message: `{${code.STATUS_201}: (${currentModule})}`
      };
    case 400:
      return {
        level: 'error',
        message: `{${code.STATUS_400}}: (${currentModule})`
      };
    case 401:
      return {
        level: 'error',
        message: `${code.STATUS_401}: (${currentModule})`
      };
    case 404:
      return {
        level: 'error',
        message: `${code.STATUS_404}: (${currentModule})`
      };
    case 500:  
      return {
        level: 'error',
        message: `${code.STATUS_500}: (${currentModule})` 
      }
    case 501:
      return {
        level: 'error',
        message: `${code.STATUS_501}: (${currentModule})`
      };
    case 503:
      return {
        level: 'error',
        message: `${code.STATUS_503}: (${currentModule})`
      };
    case 504:
      return {
        level: 'error',
        message: `${code.STATUS_504}: (${currentModule})`
      }; 
    default:
      return {
        level: 'error',
        message: code.STATUS_DEFAULT
      };
  }
} 


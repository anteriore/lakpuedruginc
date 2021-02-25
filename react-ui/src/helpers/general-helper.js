import _ from 'lodash';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import * as code from '../data/constants/status-code';

// for adding values on list form inputs
export const updateList = (form, choices) => {
  Object.entries(choices).forEach(([key, value]) => {
    if (value !== null) {
      form.form_items.forEach((formItem) => {
        if (formItem.name === key) {
          value.forEach((val) => {
            formItem.choices.push(val);
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
  switch (response.status) {
    case 200:
      if (response.data.length === 0) {
        response.statusText = 'empty';
        return { response, valid: true };
      }
      response.statusText = 'succesfull';
      return { response, valid: true };

    case 404:
    case 400:
      response.statusText = 'not existing';
      return { response, valid: false };
    case 500:
      response.statusText = 'something went wrong to the server';
      return { response, valid: false };
    default:
      break;
  }
};

export const generateStatusMessage = (payload, currentModule) => {
  const { status, data } = payload;
  switch (status) {
    case 200:
      if (data.length !== 0) {
        return {
          level: 'success',
          message: `${code.STATUS_200}: (${currentModule})`,
        };
      }
      return {
        level: 'warning',
        message: `There's no data in ${currentModule}`,
      };

    case 201:
      return {
        level: 'error',
        message: `{${code.STATUS_201}: (${currentModule})}`,
      };
    case 400:
      return {
        level: 'error',
        message: `${code.STATUS_400}: (${currentModule})`,
      };
    case 401:
      return {
        level: 'error',
        message: `${code.STATUS_401}: (${currentModule})`,
      };
    case 404:
      return {
        level: 'error',
        message: `${code.STATUS_404}: (${currentModule})`,
      };
    case 500:
      return {
        level: 'error',
        message: `${code.STATUS_500}: (${currentModule})`,
      };
    case 501:
      return {
        level: 'error',
        message: `${code.STATUS_501}: (${currentModule})`,
      };
    case 503:
      return {
        level: 'error',
        message: `${code.STATUS_503}: (${currentModule})`,
      };
    case 504:
      return {
        level: 'error',
        message: `${code.STATUS_504}: (${currentModule})`,
      };
    default:
      return {
        level: 'error',
        message: code.STATUS_DEFAULT,
      };
  }
};

// for helper functions that use hooks
const GeneralHelper = (props) => {
  const history = useHistory();

  const pushErrorPage = (statusCode, returnPath) => {
    history.push({
      pathname: `/error/${statusCode === 400 || statusCode === 404 ? 403 : statusCode}`,
      state: {
        moduleList: returnPath || '/',
      },
    });
  };

  const handleRequestResponse = (responseList, onSuccess, onFail, returnPath) => {
    let hasFailed = false;
    responseList.forEach((response) => {
      if (response.hasOwnProperty('error') && !hasFailed) {
        hasFailed = true;
        if (typeof onFail === 'function') {
          onFail();
        } else {
          pushErrorPage(response?.payload?.status ?? 400, returnPath);
        }
      }
    });
    if (!hasFailed) {
      if (onSuccess !== null) {
        onSuccess();
      }
    }
  };

  return { handleRequestResponse };
};

export default GeneralHelper;

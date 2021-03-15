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
        response.statusText = 'list is empty';
        return { response, valid: true };
      }
      response.statusText = 'succesful';
      return { response, valid: true };

    case 404:
    case 400:
      response.statusText = 'process from client failed';
      return { response, valid: false };
    case 500:
      response.statusText = 'process from server failed';
      return { response, valid: false };
    default:
      break;
  }
};

export const generateStatusMessage = (payload, currentModule, action) => {
  const { status, data, statusText } = payload; 
  const getMessageLevel = () => {
    if (status === 200) {
      if (data.length === 0) {
        return 'warning'
      }
      return 'success'
    }
    return 'error';
  }

  return {
    level: getMessageLevel(),
    message: `${currentModule}: ${_.upperFirst(action)} ${statusText}`
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
      console.log(response, "Checking Response", hasFailed)
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

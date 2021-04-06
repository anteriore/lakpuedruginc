import _ from 'lodash';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import statusDialogue from '../components/StatusDialogue';

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
  if(response.status >= 300){
    response.statusText = 'failed. An error has occurred';
    return { response, valid: false };
  }
  else if(response.status >= 200){
    if (response.data.length === 0) {
      response.statusText = 'successful. No data retrieved.';
      return { response, valid: true };
    }
    response.statusText = 'successful';
    return { response, valid: true };
  }
  else {
    response.statusText = 'failed. An error has occured';
    return { response, valid: false };
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

export const reevalutateMessageStatus = ({ action, statusMessage, statusLevel}) => {
  if ( action !== '') {
    statusDialogue({ statusMessage, statusLevel, action }, 'message');
  }
}

export const reevalDependencyMsgStats = ({
  status, action, 
  statusLevel, statusMessage, 
  module}) => {

  if (status !== 'loading' && status !== 'succeeded') {
    if (action === 'fetch') {
      statusDialogue(
        {
          statusLevel: statusLevel,
          modalContent: {
            title: `${_.capitalize(statusLevel)} - ${module}`,
            content: statusMessage,
          },
        },
        'modal'
      );  
    }
  }
}

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

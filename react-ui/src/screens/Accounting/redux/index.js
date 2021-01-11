import { combineReducers } from 'redux';

import PDCDisbursements from '../PDCDisbursements/redux';

const accounting = combineReducers({
  PDCDisbursements,
});

export default accounting;

import { combineReducers } from 'redux';

import PDCDisbursements from '../PDCDisbursements/redux';
import accountTitles from '../AccountTitles/redux';

const accounting = combineReducers({
  accountTitles,
  PDCDisbursements,
});

export default accounting;

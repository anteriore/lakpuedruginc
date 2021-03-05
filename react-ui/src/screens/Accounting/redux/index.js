import { combineReducers } from 'redux';

import PDCDisbursements from '../PDCDisbursements/redux';
import accountTitles from '../AccountTitles/redux';
import chequePrintings from '../ChequePrintings/redux';

const accounting = combineReducers({
  accountTitles,
  PDCDisbursements,
  chequePrintings
});

export default accounting;

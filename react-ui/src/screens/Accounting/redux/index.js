import { combineReducers } from 'redux';

import PDCDisbursements from '../PDCDisbursements/redux';
import accountTitles from '../AccountTitles/redux';
import chequePrintings from '../ChequePrintings/redux';
import chequeDisbursements from '../ChequeDisbursements/redux';

const accounting = combineReducers({
  accountTitles,
  PDCDisbursements,
  chequePrintings,
  chequeDisbursements
});

export default accounting;

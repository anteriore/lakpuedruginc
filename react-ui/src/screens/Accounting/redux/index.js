import { combineReducers } from 'redux';

import accountTitles from '../AccountTitles/redux';
import PDCDisbursements from '../PDCDisbursements/redux';
import PDCVouchers from '../PDCVouchers/redux';

const accounting = combineReducers({
  accountTitles,
  PDCDisbursements,
  PDCVouchers,
});

export default accounting;

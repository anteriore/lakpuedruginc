import { combineReducers } from 'redux';

import PDCDisbursements from '../PDCDisbursements/redux';
import purchaseVouchers from '../PurchaseVouchers/redux';
import accountTitles from '../AccountTitles/redux';
import PDCDisbursements from '../PDCDisbursements/redux';
import PDCVouchers from '../PDCVouchers/redux';

const accounting = combineReducers({
  accountTitles,
  PDCDisbursements,
  purchaseVouchers,
  PDCVouchers,
});

export default accounting;

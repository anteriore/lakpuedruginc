import { combineReducers } from 'redux';

import PDCDisbursements from '../PDCDisbursements/redux';
import purchaseVouchers from '../PurchaseVouchers/redux';
import accountTitles from '../AccountTitles/redux';

const accounting = combineReducers({
  accountTitles,
  PDCDisbursements,
  purchaseVouchers
});

export default accounting;

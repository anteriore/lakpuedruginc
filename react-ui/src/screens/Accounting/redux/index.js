import { combineReducers } from 'redux';

import purchaseVouchers from '../PurchaseVouchers/redux';
import accountTitles from '../AccountTitles/redux';
import chequePrintings from '../ChequePrintings/redux';
import PDCDisbursements from '../PDCDisbursements/redux';
import PDCVouchers from '../PDCVouchers/redux';

const accounting = combineReducers({
  accountTitles,
  PDCDisbursements,
  chequePrintings,
  purchaseVouchers,
  PDCVouchers,
});

export default accounting;

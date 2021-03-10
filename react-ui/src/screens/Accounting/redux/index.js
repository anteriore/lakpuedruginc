import { combineReducers } from 'redux';

import purchaseVouchers from '../PurchaseVouchers/redux';
import accountTitles from '../AccountTitles/redux';
import PDCDisbursements from '../PDCDisbursements/redux';
import PDCVouchers from '../PDCVouchers/redux';
import journalVouchers from '../JournalVouchers/redux';
import vouchers from '../Vouchers/redux';

const accounting = combineReducers({
  accountTitles,
  PDCDisbursements,
  purchaseVouchers,
  PDCVouchers,
  journalVouchers,
  vouchers,
});

export default accounting;

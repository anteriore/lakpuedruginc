import { combineReducers } from 'redux';

import purchaseVouchers from '../PurchaseVouchers/redux';
import accountTitles from '../AccountTitles/redux';
import PDCDisbursements from '../PDCDisbursements/redux';
import PDCVouchers from '../PDCVouchers/redux';
import debitMemo from '../DebitMemo/redux';
import creditMemo from '../CreditMemo/redux';

const accounting = combineReducers({
  accountTitles,
  PDCDisbursements,
  purchaseVouchers,
  PDCVouchers,
  debitMemo,
  creditMemo,
});

export default accounting;

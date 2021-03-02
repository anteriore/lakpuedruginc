import { combineReducers } from 'redux';

import PDCDisbursements from '../PDCDisbursements/redux';
import purchaseVouchers from '../PurchaseVouchers/redux';

const accounting = combineReducers({
  PDCDisbursements,
  purchaseVouchers
});

export default accounting;

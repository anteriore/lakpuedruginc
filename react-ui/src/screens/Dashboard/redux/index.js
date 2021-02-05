import { combineReducers } from 'redux';

import purchaseRequests from '../PurchaseRequests/redux';
import productInventories from '../ProductInventories/redux';

const dashboard = combineReducers({
  purchaseRequests,
  productInventories
});

export default dashboard;

import { combineReducers } from 'redux';

import purchaseRequests from '../PurchaseRequests/redux';
import productInventories from '../ProductInventories/redux';
import FGIssuances from '../FGIssuances/redux';

const dashboard = combineReducers({
  purchaseRequests,
  productInventories,
  FGIssuances
});

export default dashboard;

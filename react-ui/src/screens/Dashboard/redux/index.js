import { combineReducers } from 'redux';

import purchaseRequests from '../PurchaseRequests/redux';
import inventory from '../Inventory/redux';

const dashboard = combineReducers({
  purchaseRequests,
  inventory, 
});

export default dashboard;

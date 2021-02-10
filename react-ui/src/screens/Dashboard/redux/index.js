import { combineReducers } from 'redux';

import purchaseRequests from '../PurchaseRequests/redux';
import productInventories from '../ProductInventories/redux';
import inventory from '../Inventory/redux';

const dashboard = combineReducers({
  purchaseRequests,
  productInventories,
  inventory, 
});

export default dashboard;

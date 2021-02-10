import { combineReducers } from 'redux';

import purchaseRequests from '../PurchaseRequests/redux';
import productInventories from '../ProductInventories/redux';
import inventory from '../Inventory/redux';
import productMovements from '../ProductMovements/redux';

const dashboard = combineReducers({
  purchaseRequests,
  productInventories,
  inventory, 
  productMovements
});

export default dashboard;

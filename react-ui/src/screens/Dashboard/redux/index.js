import { combineReducers } from 'redux';

import purchaseRequests from '../PurchaseRequests/redux';
import inventory from '../Inventory/redux';
import productMovements from '../ProductMovements/redux';

const dashboard = combineReducers({
  purchaseRequests,
  inventory, 
  productMovements
});

export default dashboard;

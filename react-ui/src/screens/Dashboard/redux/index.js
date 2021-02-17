import { combineReducers } from 'redux';

import purchaseRequests from '../PurchaseRequests/redux';
import productInventories from '../ProductInventories/redux';
import FGIssuances from '../FGIssuances/redux';
import FGReceivings from '../FGReceivings/redux';
import inventory from '../Inventory/redux';
import productMovements from '../ProductMovements/redux';
import employees from '../Employees/redux';
import jobOrders from '../JobOrder/redux';

const dashboard = combineReducers({
  purchaseRequests,
  productInventories,
  FGIssuances,
  FGReceivings,
  inventory, 
  productMovements,
  employees,
  jobOrders
});

export default dashboard;

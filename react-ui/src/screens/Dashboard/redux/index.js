import { combineReducers } from 'redux';

import purchaseRequests from '../PurchaseRequests/redux';
import productInventories from '../ProductInventories/redux';
import FGIssuances from '../FGIssuances/redux';
import FGReceivings from '../FGReceivings/redux';
import materialIssuances from '../MaterialIssuances/redux';
import inventory from '../Inventory/redux';
import productMovements from '../ProductMovements/redux';

const dashboard = combineReducers({
  purchaseRequests,
  productInventories,
  FGIssuances,
  FGReceivings,
  materialIssuances,
  inventory, 
  productMovements
});

export default dashboard;

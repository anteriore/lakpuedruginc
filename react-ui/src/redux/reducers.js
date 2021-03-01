import { combineReducers } from 'redux';

import auth from './auth';
import accounting from '../screens/Accounting/redux';
import dashboard from '../screens/Dashboard/redux';
import maintenance from '../screens/Maintenance/redux';
import users from '../screens/Users/redux';
import company from './company';
import purchaseOrders from '../screens/Purchasing/redux';
import sales from '../screens/Sales/redux';
import rnd from '../screens/RND/redux';

const rootReducer = combineReducers({
  auth,
  accounting,
  dashboard,
  maintenance,
  users,
  company,
  purchaseOrders,
  sales,
  rnd,
});

export default rootReducer;

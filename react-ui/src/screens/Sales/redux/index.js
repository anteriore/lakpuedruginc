import { combineReducers } from 'redux';
import salesOrders from '../SalesOrders/redux';

const sales = combineReducers({
  salesOrders
});

export default sales;

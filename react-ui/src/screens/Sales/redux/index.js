import { combineReducers } from 'redux';
import salesOrders from '../SalesOrders/redux';
import orderSlips from '../OrderSlips/redux';

const sales = combineReducers({
  salesOrders,
  orderSlips
});

export default sales;

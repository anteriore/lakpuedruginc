import { combineReducers } from 'redux';
import salesOrders from '../SalesOrders/redux';
import orderSlips from '../OrderSlips/redux';
import acknowledgementReceipts from '../AcknowledgementReceipts/redux';
import officialReceipts from '../OfficialReceipts/redux';

const sales = combineReducers({
  salesOrders,
  orderSlips,
  acknowledgementReceipts,
  officialReceipts,
});

export default sales;

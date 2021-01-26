import { combineReducers } from 'redux';
import salesOrders from '../SalesOrders/redux';
import orderSlips from '../OrderSlips/redux';
import acknowledgementReceipts from '../AcknowledgementReceipts/redux';
import salesInvoice from '../SalesInvoice/redux';

const sales = combineReducers({
  salesOrders,
  orderSlips,
  acknowledgementReceipts,
  salesInvoice,
});

export default sales;

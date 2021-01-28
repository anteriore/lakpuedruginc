import { combineReducers } from 'redux';
import salesOrders from '../SalesOrders/redux';
import orderSlips from '../OrderSlips/redux';
import acknowledgementReceipts from '../AcknowledgementReceipts/redux';
import returnSlips from '../ReturnSlips/redux';
import salesInvoice from '../SalesInvoice/redux';

const sales = combineReducers({
  salesOrders,
  orderSlips,
  acknowledgementReceipts,
  returnSlips,
  salesInvoice,
});

export default sales;

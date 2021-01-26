import SalesOrders from '../../screens/Sales/SalesOrders';
import OrderSlips from '../../screens/Sales/OrderSlips';
import AcknowledgementReceipts from '../../screens/Sales/AcknowledgementReceipts';
import ReturnSlips from '../../screens/Sales/ReturnSlips';

export const routes = [
  {
    title: 'Sales Orders',
    path: '/sales-orders',
    component: SalesOrders,
  },
  {
    title: 'Order Slips',
    path: '/order-slips',
    component: OrderSlips,
  },
  {
    title: 'Sales Invoices',
    path: '/sales-invoices',
    component: '',
  },
  {
    title: 'Acknowledgement Receipts',
    path: '/acknowledgement-receipts',
    component: AcknowledgementReceipts,
  },
  {
    title: 'Return Slips',
    path: '/return-slips',
    component: ReturnSlips,
  },
  {
    title: 'Official Receipts',
    path: '/official-receipts',
    component: '',
  },
];

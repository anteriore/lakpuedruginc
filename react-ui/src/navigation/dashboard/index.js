import PurchaseRequests from '../../screens/Dashboard/PurchaseRequests';
import Inventory from '../../screens/Dashboard/Inventory';
import ReceivingReceipts from '../../screens/Dashboard/ReceivingReceipts';
import ApprovedReceipts from '../../screens/Dashboard/ApprovedReceipts';
import ProductMovements from '../../screens/Dashboard/ProductMovements';
import ProductInventories from '../../screens/Dashboard/ProductInventories';
import FGIssuances from '../../screens/Dashboard/FGIssuances';
import FGReceivings from '../../screens/Dashboard/FGReceivings';
import MaterialIssuances from '../../screens/Dashboard/MaterialIssuances';

export const routes = [
  {
    title: 'Purchase Requests',
    path: '/purchase-requests',
    component: PurchaseRequests,
  },
  {
    title: 'Receiving Receipts',
    path: '/receiving-receipts',
    component: ReceivingReceipts,
  },
  {
    title: 'Approved Receipts',
    path: '/approved-receipts',
    component: ApprovedReceipts,
  },
  {
    title: 'Material Re-evaluations',
    path: '/material-reevaluations',
    component: PurchaseRequests,
  },
  {
    title: 'Inventory',
    path: '/inventory',
    component: Inventory,
  },
  {
    title: 'Material Issuance Slips',
    path: '/material-issueance',
    component: MaterialIssuances,
  },
  {
    title: 'Material Receiving Slips',
    path: '/material-receiving',
    component: PurchaseRequests,
  },
  {
    title: 'Inventory Movement Slips',
    path: '/inventory-movement',
    component: PurchaseRequests,
  },
  {
    title: 'Product Movements',
    path: '/product-movement',
    component: ProductMovements,
  },
  {
    title: 'Product Inventory',
    path: '/product-inventory',
    component: ProductInventories,
  },
  {
    title: 'FG-IS',
    path: '/fgis',
    component: FGIssuances,
  },
  {
    title: 'FG-RS',
    path: '/fgrs',
    component: FGReceivings,
  },
  {
    title: 'Depot Inventory',
    path: '/depot-inventory',
    component: PurchaseRequests,
  },
  {
    title: 'Employee',
    path: '/employees',
    component: PurchaseRequests,
  },
  {
    title: 'Job Order',
    path: '/job-orders',
    component: PurchaseRequests,
  },
  {
    title: 'Engineering Items',
    path: '/engineering-items',
    component: PurchaseRequests,
  },
  {
    title: 'Engineering Inventory',
    path: '/engineering-inventory',
    component: PurchaseRequests,
  },
  {
    title: 'Account Summary Reports',
    path: '/account-summary',
    component: PurchaseRequests,
  },
  {
    title: 'Sales Reports',
    path: '/sales-reports',
    component: PurchaseRequests,
  },
];

import Product from '../../screens/Maintenance/Products';
import FinishedGoods from '../../screens/Maintenance/FinishedGoods';
import DepartmentArea from '../../screens/Maintenance/DepartmentArea';
import Units from '../../screens/Maintenance/Units';
import ItemTypes from '../../screens/Maintenance/ItemTypes';
import Items from '../../screens/Maintenance/Items';
import RegionCodes from '../../screens/Maintenance/RegionCodes';
import ProvinceCode from '../../screens/Maintenance/ProvinceCode';
import ZipCodes from '../../screens/Maintenance/ZipCodes';
import AccountCodes from '../../screens/Maintenance/AccountCodes';
import ProductDivisions from '../../screens/Maintenance/ProductDivisions';
import InstitutionalCodes from '../../screens/Maintenance/InstitutionalCodes';
import MemoTypes from '../../screens/Maintenance/MemoTypes';
import BankAccounts from '../../screens/Maintenance/BankAccounts';
import ClusterCodes from '../../screens/Maintenance/ClusterCodes';
import ProductionArea from '../../screens/Maintenance/ProductionArea';
import Procedures from '../../screens/Maintenance/Procedures';

export const routes = [
  {
    title: 'Finished Goods',
    path: '/finished_goods',
    component: FinishedGoods,
  },
  {
    title: 'Client',
    path: '/client',
    component: '',
  },
  {
    title: 'Vendor',
    path: '/vendor',
    component: '',
  },
  {
    title: 'Classification',
    path: '/classification',
    component: '',
  },
  {
    title: 'Group & Categories',
    path: '/group_categories',
    component: '',
  },
  {
    title: 'Department Area & Codes',
    path: '/department_area',
    component: DepartmentArea,
  },
  {
    title: 'Items',
    path: '/items',
    component: Items,
  },
  {
    title: 'Units',
    path: '/units',
    component: Units,
  },
  {
    title: 'Item Types',
    path: '/items_types',
    component: ItemTypes,
  },
  {
    title: 'Depots',
    path: '/depots',
    component: '',
  },
  {
    title: 'Products',
    path: '/products',
    component: Product,
  },
  {
    title: 'Procedure',
    path: '/procedure',
    component: Procedures,
  },
  {
    title: 'Production Area',
    path: '/production_area',
    component: ProductionArea,
  },
  {
    title: 'Memo Types',
    path: '/memo_types',
    component: MemoTypes,
  },
  {
    title: 'Bank Accounts',
    path: '/bank_accounts',
    component: BankAccounts,
  },
  {
    title: 'Product Divisions',
    path: '/product_divisions',
    component: ProductDivisions,
  },
  {
    title: 'Region Codes',
    path: '/codes/region',
    component: RegionCodes,
  },
  {
    title: 'Cluster Codes',
    path: '/codes/cluster',
    component: ClusterCodes,
  },
  {
    title: 'Institutional Codes',
    path: '/codes/institutional',
    component: InstitutionalCodes,
  },
  {
    title: 'Account Codes',
    path: '/codes/account',
    component: AccountCodes,
  },
  {
    title: 'Province Codes',
    path: '/codes/province',
    component: ProvinceCode,
  },
  {
    title: 'Sales Codes',
    path: '/codes/sales',
    component: '',
  },
  {
    title: 'Zip Codes',
    path: '/codes/zip',
    component: ZipCodes,
  },
  {
    title: 'Product Categories',
    path: '/product_categories',
    component: '',
  },
];

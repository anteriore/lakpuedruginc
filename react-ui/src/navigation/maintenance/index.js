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
import ProductCategories from '../../screens/Maintenance/ProductCategories';
import Depots from '../../screens/Maintenance/Depots';
import Classification from '../../screens/Maintenance/Classification';
import Procedures from '../../screens/Maintenance/Procedures';
import GroupsCategories from '../../screens/Maintenance/GroupsCategories';
import SalesReps from '../../screens/Maintenance/SalesReps';
import Clients from '../../screens/Maintenance/Clients';
import Vendors from '../../screens/Maintenance/Vendors';

export const routes = [
  {
    title: 'Finished Goods',
    path: '/finished_goods',
    key: 'rnd-finished-good',
    component: FinishedGoods,
  },
  {
    title: 'Client',
    path: '/client',
    key: 'mis-c',
    component: Clients,
  },
  {
    title: 'Vendor',
    path: '/vendor',
    component: Vendors,
  },
  {
    title: 'Classification',
    path: '/classification',
    component: Classification,
  },
  {
    title: 'Group & Categories',
    path: '/group_categories',
    component: GroupsCategories,
  },
  {
    title: 'Department & Area Codes',
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
    component: Depots,
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
    title: 'Sales Reps',
    path: '/codes/sales',
    component: SalesReps,
  },
  {
    title: 'Zip Codes',
    path: '/codes/zip',
    component: ZipCodes,
  },
  {
    title: 'Product Categories',
    path: '/product_categories',
    component: ProductCategories,
  },
];

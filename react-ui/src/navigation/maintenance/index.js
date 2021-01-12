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
    path: '/finished-goods',
    component: FinishedGoods,
  },
  {
    title: 'Client',
    path: 'clients',
    component: Clients,
  },
  {
    title: 'Vendor',
    path: '/vendors',
    component: Vendors,
  },
  {
    title: 'Classification',
    path: '/classifications',
    component: Classification,
  },
  {
    title: 'Group & Categories',
    path: '/group-categories',
    component: GroupsCategories,
  },
  {
    title: 'Department & Area Codes',
    path: '/department-areas',
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
    path: '/items-types',
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
    path: '/procedures',
    component: Procedures,
  },
  {
    title: 'Production Area',
    path: '/production-areas',
    component: ProductionArea,
  },
  {
    title: 'Memo Types',
    path: '/memo-types',
    component: MemoTypes,
  },
  {
    title: 'Bank Accounts',
    path: '/bank-accounts',
    component: BankAccounts,
  },
  {
    title: 'Product Divisions',
    path: '/product-divisions',
    component: ProductDivisions,
  },
  {
    title: 'Region Codes',
    path: '/region-codes',
    component: RegionCodes,
  },
  {
    title: 'Cluster Codes',
    path: '/cluster-codes',
    component: ClusterCodes,
  },
  {
    title: 'Institutional Codes',
    path: '/institutional-codes',
    component: InstitutionalCodes,
  },
  {
    title: 'Account Codes',
    path: '/account-codes',
    component: AccountCodes,
  },
  {
    title: 'Province Codes',
    path: '/province-codes',
    component: ProvinceCode,
  },
  {
    title: 'Sales Reps',
    path: '/sales-reps',
    component: SalesReps,
  },
  {
    title: 'Zip Codes',
    path: '/zip-codes',
    component: ZipCodes,
  },
  {
    title: 'Product Categories',
    path: '/product-categories',
    component: ProductCategories,
  },
];

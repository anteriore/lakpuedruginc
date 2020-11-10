import { combineReducers } from 'redux';

import departmentArea from '../DepartmentArea/redux';
import finishedGoods from '../FinishedGoods/redux';
import itemTypes from '../ItemTypes/redux';
import units from '../Units/redux';

const maintenance = combineReducers({
  departmentArea,
  finishedGoods,
  itemTypes,
  units,
});

export default maintenance;

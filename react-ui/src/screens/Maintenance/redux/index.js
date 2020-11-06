import { combineReducers } from 'redux';

import departmentArea from '../DepartmentArea/redux';
import finishedGoods from '../FinishedGoods/redux';
import units from '../Units/redux'; 

const maintenance = combineReducers({
  departmentArea,
  finishedGoods,
  units
})

export default maintenance
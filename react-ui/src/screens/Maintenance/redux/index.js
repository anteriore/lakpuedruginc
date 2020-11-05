import { combineReducers } from 'redux';

import departmentArea from '../DepartmentArea/redux';
import finishedGoods from '../FinishedGoods/redux'; 

const maintenance = combineReducers({
  departmentArea,
  finishedGoods,
})

export default maintenance
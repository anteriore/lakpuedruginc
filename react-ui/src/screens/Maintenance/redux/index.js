import { combineReducers } from 'redux';

import departmentArea from '../DepartmentArea/redux';

const maintenance = combineReducers({
    departmentArea,
})

export default maintenance
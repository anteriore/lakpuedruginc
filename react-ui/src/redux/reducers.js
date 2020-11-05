import { combineReducers } from 'redux';

import auth from './auth';
import dashboard from '../screens/Dashboard/redux';
import users from '../screens/Users/redux';
import maintenance from '../screens/Maintenance/redux/';

const rootReducer = combineReducers({
    auth,
    dashboard,
    users,
    maintenance
})

export default rootReducer
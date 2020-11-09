import { combineReducers } from 'redux';

import auth from './auth';
import dashboard from '../screens/Dashboard/redux';
import maintenance from '../screens/Maintenance/redux';
import users from '../screens/Users/redux';

const rootReducer = combineReducers({
    auth,
    dashboard,
    maintenance,
    users
})

export default rootReducer
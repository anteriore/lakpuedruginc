import { combineReducers } from 'redux';

import auth from './auth';
import dashboard from '../screens/Dashboard/redux';
import users from '../screens/Users/redux';

const rootReducer = combineReducers({
    auth,
    dashboard,
    users
})

export default rootReducer
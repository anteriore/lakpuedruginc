import { combineReducers } from 'redux';

import auth from './auth';
import login from '../screens/Login/redux/reducers/';
import dashboard from '../screens/Dashboard/redux/reducers/';
import users from '../screens/Users/redux/reducers/';

const rootReducer = combineReducers({
    auth,
    login,
    dashboard,
    users
})

export default rootReducer
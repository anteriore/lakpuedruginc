import { combineReducers } from 'redux';

import login from './auth/reducers/';
import dashboard from '../screens/Dashboard/redux/reducers/';

const rootReducer = combineReducers({
    login,
    dashboard
})

export default rootReducer
import React from 'react';
import { Switch, Route } from "react-router-dom";

import Dashboard from '../../screens/Dashboard/';
import Users from '../../screens/Users/';

const AdminRoutes = (props) => {
    return (
        <Switch>
            <Route path="" component={Dashboard} />
            <Route path="/users" component={Users} />
        </Switch>
    )
}

export default AdminRoutes
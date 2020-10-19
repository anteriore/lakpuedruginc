import React from 'react';
import { Switch, Route } from "react-router-dom";

import Dashboard from '../../screens/Dashboard';

const AdminRoutes = (props) => {
    return (
        <Switch>
            <Route path="" component={Dashboard} />
        </Switch>
    )
}

export default AdminRoutes
import React from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import {Result, Button} from 'antd';

import Dashboard from '../../screens/Dashboard';
import Maintenance from '../../screens/Maintenance';
import Users from '../../screens/Users';
import Accounting from '../../screens/Accounting';
import Sales from '../../screens/Sales';
// import MMD from '../../screens/MMD/';
// import RND from '../../screens/RND/';
import Purchasing from '../../screens/Purchasing';
// import Costing from '../../screens/Costing/';
import Account from '../../screens/Account';
import ErrorPage from '../../screens/Errors/ErrorPage';

const AdminRoutes = () => {
  return (
    <div>
      <Switch>
        <Route path="/maintenance" component={Maintenance} />
        <Route path="/users" component={Users} />
        <Route path="/account" component={Account} />
        <Route path="/accounting" component={Accounting} />
        <Route path="/sales" component={Sales} />
        {/* <Route path="/mmd" component={MMD} /> */}
        {/* <Route path="/rnd" component={RND} /> */}
        <Route path="/purchasing" component={Purchasing} />
        {/* <Route path="/costing" component={Costing} /> */}
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
        <Route path="/error/:errorCode" component={ErrorPage} />
        <Route path="*">
          <Result
            status="404"
            title="404"
            subTitle="Sorry, the page you're looking for does not exist."
            extra={<Button type="primary"><Link to="/dashboard">Return to Dashboard</Link></Button>}
          />
        </Route>
      </Switch>
    </div>
  );
};

export default AdminRoutes;

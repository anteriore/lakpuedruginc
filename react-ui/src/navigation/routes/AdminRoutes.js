import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Dashboard from '../../screens/Dashboard';
import Maintenance from '../../screens/Maintenance';
// import Users from '../../screens/Users/';
// import Accounting from '../../screens/Accounting/';
// import Sales from '../../screens/Sales/';
// import MMD from '../../screens/MMD/';
// import RND from '../../screens/RND/';
// import Purchasing from '../../screens/Purchasing/';
// import Costing from '../../screens/Costing/';

const AdminRoutes = () => {
  return (
    <div>
      <Switch>
        <Route path="/maintenance" component={Maintenance} />
        {/* <Route path="/users" component={Users} /> */}
        {/* <Route path="/accounting" component={Accounting} /> */}
        {/* <Route path="/sales" component={Sales} /> */}
        {/* <Route path="/mmd" component={MMD} /> */}
        {/* <Route path="/rnd" component={RND} /> */}
        {/* <Route path="/purchasing" component={Purchasing} /> */}
        {/* <Route path="/costing" component={Costing} /> */}
        <Route path="/dashboard" component={Dashboard} />
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>
      </Switch>
    </div>
  );
};

export default AdminRoutes;

import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import AdminRoutes from './routes/AdminRoutes';
import Login from '../screens/Login';

const Main = () => {
  const signedIn = useSelector((state) => state.auth.signedIn);

  const PrivateRoute = ({ children, ...rest }) => {
    const signedInStatus = useSelector((state) => state.auth.signedIn);
    return (
      <Route
        {...rest}
        render={() => (signedInStatus ? children : <Redirect to={{ pathname: '/login' }} />)}
      />
    );
  };

  return (
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/" signedIn={signedIn}>
          <AdminRoutes />
        </PrivateRoute>
      </Switch>
    </div>
  );
};

export default Main;

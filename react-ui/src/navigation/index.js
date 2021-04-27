import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import AdminRoutes from './routes/AdminRoutes';
import Login from '../screens/Account/Login';
import { getUser } from '../redux/auth';
import {
  reevalutateMessageStatus,
} from '../helpers/general-helper'

const Main = () => {
  const {signedIn, status, statusLevel, statusMessage, action} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (signedIn) {
      dispatch(getUser());
    }
  }, [dispatch, signedIn]);

  useEffect(() => {
    reevalutateMessageStatus({ status, action, statusMessage, statusLevel });
  }, [status, action, statusMessage, statusLevel]);

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

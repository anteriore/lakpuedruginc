import React from 'react';
import { Switch, Route, Redirect } from "react-router-dom";

import AdminRoutes from './routes/AdminRoutes';
import Login from '../screens/Login'

const Main = (props) => {
    return (
        <div>
            <Switch>
                <Route path="/login" component={Login} />
                <PrivateRoute path="">
                    <AdminRoutes/>
                </PrivateRoute>
            </Switch>
        </div>
    )
}

//hard coded for now
const signedIn = false

function PrivateRoute({ children, ...rest }) {
    return (
      <Route {...rest} render={({ location }) =>
      signedIn ? (
            children
          ) : (
            <Redirect to={{ pathname: "/login" }}/>
          )
        }
      />
    );
  }

export default Main
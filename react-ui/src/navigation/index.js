import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";

import AdminRoutes from './routes/AdminRoutes';
import Login from '../screens/Login'

const Main = (props) => {
  const signedIn = useSelector(state => state.auth.signedIn)
  const history = useHistory();

  useEffect(() => {
    if(signedIn === true){
      history.push("/")
    }
  }, [signedIn, history])

  const PrivateRoute = ({ children, ...rest }) => {
    const signedIn = useSelector(state => state.auth.signedIn)
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

  return (
      <div>
          <Switch>
              <Route path="/login" component={Login} />
              <PrivateRoute path="/" signedIn={signedIn}>
                  <AdminRoutes/>
              </PrivateRoute>
          </Switch>
      </div>
  )



  
}

export default Main
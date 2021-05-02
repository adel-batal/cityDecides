import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../Context/Auth/AuthContext';

const PrivateRoute = ({ component: Component, data, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} {...data} />
        )
      }
    />
  );
};

export default PrivateRoute;
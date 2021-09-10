import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../Context/Auth/AuthContext';

const AdminPrivateRoute = ({ component: Component, data, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, user } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        (!isAuthenticated && !loading) ||
        (user !== null && user.role !== 'admin') ? (
          <Redirect exact to='/' />
        ) : (
          <Component {...props} {...data} />
        )
      }
    />
  );
};

export default AdminPrivateRoute;

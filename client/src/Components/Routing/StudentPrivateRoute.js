import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../Context/Auth/AuthContext';

const StudentPrivateRoute = ({ component: Component, data, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading, user } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        (!isAuthenticated && !loading) ||
        (user !== null && user.role !== 'student') ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} {...data} />
        )
      }
    />
  );
};

export default StudentPrivateRoute;

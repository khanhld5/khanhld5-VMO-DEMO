import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuth from '../../hooks/useAuth';

const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuth = useAuth();
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? <Redirect to='/dashboard' /> : <Component {...props} />
      }
    />
  );
};

export default PublicRoute;

import React from 'react';
import { logout } from '../../helpers/logout';
import { Route, Redirect } from 'react-router-dom';

export default function Logout({ role, check, authenticated, children, ...rest }) {
  logout();
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

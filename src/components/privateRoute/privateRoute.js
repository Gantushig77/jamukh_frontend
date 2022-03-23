import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function PrivateRoute({ role, check, authenticated, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return authenticated === true || authenticated === 'true' ? (
          role ? (
            check === true ? (
              children
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: location },
                }}
              />
            )
          ) : (
            children
          )
        ) : (
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

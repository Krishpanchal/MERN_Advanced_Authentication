import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ Component, ...routeProps }) {
  return (
    <Route {...routeProps}>
      {localStorage.getItem("authToken") ? (
        <Component />
      ) : (
        <Redirect to='/login' />
      )}
    </Route>
  );
}

export default PrivateRoute;

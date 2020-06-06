import React from 'react';

import { Redirect, Route } from 'react-router-dom';


function RoutePrivate({ children, ...props })
{
  const redirect = (from) => <Redirect to={ { pathname: '/login', state: { from } } }/>;

  const element =
    <
      Route
      {
        ...props
      }
      render = { ({ location }) => props.user.token ? children : redirect(location) }
    />
  ;

  return element;
}


export default RoutePrivate;

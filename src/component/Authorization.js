import React from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { withCookies } from 'react-cookie';

import Login from './Login';

// const Context = React.createContext({});


function Authorization({ cookies, children, ...props })
{
  // return children;

  // const token = cookies.get('token');
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTE3NTQ3NjJ9.FJ1-UNyYdI_Vhax93rUX1AgoDh4vnD2fs61wb8ZHRoQ';

  const redirect = (from) => <Redirect to={ { pathname: '/login', state: { from } } }/>;

  const element =

    <BrowserRouter>
      <Switch>
        <
          Route
          path      = '/login'
          component = { Login }
        />
        <
          Route
          render = { ({ location }) => token ? children : redirect(location) }
        />
      </Switch>
    </BrowserRouter>
  ;

  return element;
}


export default withCookies(Authorization);

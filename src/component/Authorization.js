import React from 'react';

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import Context from './Context';

import Login from './Login';


function Authorization({ cookies, children, ...props })
{
  const redirect = (from) => <Redirect to={ { pathname: '/login', state: { from } } }/>;

  const element =

    <Context.Consumer>
      {
        ({ cookies }) =>
        {
          const token = cookies.get('token');

          const router =

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

          return router;
        }
      }
    </Context.Consumer>
  ;

  return element;
}


export default Authorization;

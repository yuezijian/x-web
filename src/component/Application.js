import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ApolloProvider  } from '@apollo/react-hooks';

import { CookiesProvider, withCookies } from 'react-cookie';

import Context from './Context';

import Authorization from './Authorization';

import Navigation from './Navigation';

import client from '../client';

import Grid from './layout/Grid';

import XView   from './XView';
import Example from './Example';
import ORM     from './x-data/ORM';
import PG_Show from './PG_Show';


class Application extends React.Component
{
  render()
  {
    const { cookies } = this.props;

    const element =

      <CookiesProvider>
        <Context.Provider value={ { cookies } }>
          <ApolloProvider client={ client({ token: () => cookies.get('token') }) }>
            <Authorization enable={ false }>
              <Grid layout='p-0' fluid>
                <BrowserRouter>
                  <div className='row'>
                    <div className='col'>
                      <Navigation/>
                    </div>
                  </div>
                  <div className='row my-2'>
                    <div className='col'>
                      <Switch>
                        <Route path='/' exact={ true }>
                          <XView/>
                        </Route>
                        <Route path='/his3'>
                          <PG_Show/>
                        </Route>
                        <Route path='/x-data/orm'>
                          <ORM/>
                        </Route>
                        <Route path='/example/subscription'>
                          <Example.Subscription/>
                        </Route>
                      </Switch>
                    </div>
                  </div>
                </BrowserRouter>
              </Grid>
            </Authorization>
          </ApolloProvider>
        </Context.Provider>
      </CookiesProvider>
    ;

    return element;
  }
}


export default withCookies(Application);

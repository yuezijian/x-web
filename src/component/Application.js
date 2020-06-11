import React from 'react';

import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import
{
  BrowserRouter, Route, Switch
} from 'react-router-dom';

import { ApolloProvider  } from '@apollo/react-hooks';

// import { Subscription } from '@apollo/react-components';

import { CookiesProvider, withCookies } from 'react-cookie';

import Context from './Context';

import Authorization from './Authorization';

import Navigation from './Navigation';

import client from '../client';

import Example from './Example';


class Application extends React.Component
{
  render()
  {
    const { cookies } = this.props;

    const element =

      <CookiesProvider>
        <Context.Provider value={ { cookies } }>
          <ApolloProvider client={ client({ token: () => cookies.get('token') }) }>
            <Authorization>
              <Container>
                <BrowserRouter>
                  <Row>
                    <Col>
                      <Navigation/>
                    </Col>
                  </Row>
                  <Row className='my-2'>
                    <Col>
                      <Switch>
                        <Route path='/' exact={ true }>
                          <div/>
                        </Route>
                        <Route path='/example/subscription'>
                          <Example.Subscription/>
                        </Route>
                        <Route path='/his3/order'>
                          <div>his3/order</div>
                        </Route>
                      </Switch>
                    </Col>
                  </Row>
                </BrowserRouter>
              </Container>
            </Authorization>
          </ApolloProvider>
        </Context.Provider>
      </CookiesProvider>
    ;

    return element;
  }
}


export default withCookies(Application);

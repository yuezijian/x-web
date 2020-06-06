import React from 'react';

import Container from 'react-bootstrap/Container';

import
{
  BrowserRouter, Route, Switch
}
from 'react-router-dom';

import { withCookies } from 'react-cookie';

import { gql } from 'apollo-boost';

import { ApolloProvider  } from '@apollo/react-hooks';

import client from '../client.js';

import Authorization from './Authorization';

import Login      from './Login';
import Navigation from './Navigation';

import XMutation from './XMutation';
import XQuery    from './XQuery';

import XForm  from './XForm';
import XTable from './XTable';


const gql_request =
  {
    items:
      `
        query
        {
          items
          {
            id
            name
          }
        }
      `,

    item_add:
      `
        mutation($text: String!)
        {
          item_add(name: $text)
          {
            success
            message
            item
            {
              id
              name
            }
          }
        }
      `
  };


class Application extends React.Component
{
  constructor(props)
  {
    super(props);

    const { cookies } = props;

    this.state =
      {
        token: cookies.get('token'),

        text: ''
      };

    // this.client = create_client(() => this.state.token);
    this.client = client;

    this.subscribe = null;
  }

  componentDidMount()
  {
  }

  render()
  {
    const login = (token) =>
    {
      const { cookies } = this.props;

      cookies.set('token', token, { maxAge: 30 });

      this.setState({ token });
    };

    const element =

      <ApolloProvider client={ this.client }>
        <Authorization.Provider value={ { login } }>
          <Container>
            <BrowserRouter>
              <Navigation/>
              <Switch>
                <Route path='/' exact={ true }>
                  <div>hi</div>
                </Route>
                <Route path='/login' component={ Login }/>
                <Route path='/management' user={ { token: this.state.token } }>
                  <XMutation mutation={ gql_request.item_add }>
                    {
                      (submit) =>
                      {
                        return <XForm submit={ submit }/>;
                      }
                    }
                  </XMutation>
                  <p/>
                  <XQuery query={ gql_request.items }>
                    {
                      (data, subscribe) =>
                      {
                        return <XTable data={ data } subscribe={ subscribe }/>;
                      }
                    }
                  </XQuery>
                </Route>
              </Switch>
            </BrowserRouter>
          </Container>
        </Authorization.Provider>
      </ApolloProvider>
    ;

    return element;
  }
}


export default withCookies(Application);

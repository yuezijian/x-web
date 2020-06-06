import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Col       from 'react-bootstrap/Col';

import Button   from 'react-bootstrap/Button';
import Form     from 'react-bootstrap/Form';

import
{
  BrowserRouter, Route, Switch
}
from 'react-router-dom';

import { withCookies } from 'react-cookie';

import { gql } from 'apollo-boost';

import { ApolloProvider  }               from '@apollo/react-hooks';
import { Mutation, Query, Subscription } from '@apollo/react-components';

import client from '../client.js';

import Authorization from './Authorization';

import Login      from './Login';
import Navigation from './Navigation';

import XQuery from './XQuery';

import XTable from './XTable';


const gql_request =
  {
    items: gql
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

    add_item: gql
      `
        mutation($text: String!)
        {
          add_item(name: $text)
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
      `,

    item_add: gql
      `
        subscription
        {
          item_add
          {
            id
            name
          }
        }
      `
  };


function render_mutation(component, text)
{
  const update = (cache, { data: { add_item } }) =>
  {
    const { items } = cache.readQuery({ query: gql_request.items });

    cache.writeQuery({ query: gql_request.items, data: { items: items.concat([add_item.item]) } })
  };

  const element =

    <Mutation mutation={ gql_request.add_item } variables={ { text } }>
      {
        (mutate) =>
        {
          return component(mutate);
        }
      }
    </Mutation>
  ;

  return element;
}


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
                  <Form>
                    <Form.Row>
                      <Col>
                        <Form.Control value={ this.state.text } onChange={ (event => this.setState({ text: event.target.value }))}/>
                      </Col>
                      <Col>
                        {
                          render_mutation((mutate) => <Button onClick={ () => mutate() }>Add</Button>, this.state.text)
                        }
                      </Col>
                    </Form.Row>
                  </Form>
                  <p/>
                  <Subscription subscription={ gql_request.item_add }>
                    {
                      ({ data, loading, error }) =>
                      {
                        return <h4>New item: { !loading && data.item_add.name }</h4>;
                      }
                    }
                  </Subscription>
                  <p/>
                  <
                    XQuery
                    query     = { gql_request.items }
                    document  = { gql_request.item_add }
                    component = { (data, subscribe) => <XTable items={ data.items } subscribe={ subscribe }/> }
                  />
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

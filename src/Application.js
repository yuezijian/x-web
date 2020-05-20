import React from 'react';

import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Card   from 'react-bootstrap/Card';
import Form   from 'react-bootstrap/Form';
import Table  from 'react-bootstrap/Table';

import
{
  BrowserRouter, Route, Switch, Redirect
}
from 'react-router-dom';

import { LinkContainer } from 'react-router-bootstrap';

import ApolloClient, { gql } from 'apollo-boost';

import { ApolloProvider  } from '@apollo/react-hooks';
import { Query, Mutation } from '@apollo/react-components';

import Authorization from './Authorization';

import Login from './Login';


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
        mutation
        {
          add_item(name: "again")
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


let g_token = '';

const config =
  {
    uri: 'http://localhost:4000/graphql',

    request: (operation) =>
    {
      const context =
        {
          headers:
            {
              authorization: `Bearer ${ g_token }`
            }
        };

      operation.setContext(context);
    }
  }

const client = new ApolloClient(config);

function render_form(mutate)
{
  const element =

    <Form>
      <Form.Row>
        <Col>
          <Form.Control placeholder=''/>
        </Col>
        <Col>
          <Button onClick={ () => mutate() }>Add</Button>
        </Col>
      </Form.Row>
    </Form>
  ;

  return element;
}

function render_table(items)
{
  const element =

    <Table>
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
      </tr>
      </thead>
      <tbody>
      {
        items.map(item => <tr key={ item.id }><td>{ item.id }</td><td>{ item.name }</td></tr>)
      }
      </tbody>
    </Table>
  ;

  return element;
}

function render_mutation()
{
  const update = (cache, { data: { add_item } }) =>
  {
    const { items } = cache.readQuery({ query: gql_request.items });

    cache.writeQuery({ query: gql_request.items, data: { items: items.concat([add_item.item]) } })
  };

  const element =

    <Mutation mutation={ gql_request.add_item } update={ update }>
      {
        (mutate) =>
        {
          return render_form(mutate);
        }
      }
    </Mutation>
  ;

  return element;
}

function render_query()
{
  const element =

    <Query query={ gql_request.items }>
      {
        ({ loading, error, data, networkStatus }) =>
        {
          if (loading)
          {
            return <p>Loading...</p>;
          }

          if (error)
          {
            console.log(networkStatus);

            return <p>{ error.toString() }</p>;
          }

          return render_table(data.items);
        }
      }
    </Query>
  ;

  return element;
}


function render_content()
{
  const element =

    <ApolloProvider client={ client }>
      {
        render_mutation()
      }
      <p/>
      {
        render_query()
      }
    </ApolloProvider>
  ;

  return element;
}


class Application extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state =
      {
        token: null
      };
  }

  render()
  {
    const login = (token) =>
    {
      this.setState({ token });
    };

    const element =

      <Container className='p-3'>
        <Authorization.Provider value={ { login } }>
          <BrowserRouter>
            <LinkContainer to='/'><div>root</div></LinkContainer>
            <LinkContainer to='/login'><div>login</div></LinkContainer>
            <Switch>
              <Route path='/' exact={ true }>
                {
                  this.state.token ? render_content() : <Redirect to='/login'/>
                }
              </Route>
              <Route path='/login' component={ Login }/>
            </Switch>
          </BrowserRouter>
        </Authorization.Provider>
      </Container>
    ;

    return element;
  }
}


export default Application;

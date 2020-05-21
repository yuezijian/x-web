import React from 'react';

import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';

import Button from 'react-bootstrap/Button';
import Form   from 'react-bootstrap/Form';
import Table  from 'react-bootstrap/Table';

import
{
  BrowserRouter, Route, Switch, Redirect
}
  from 'react-router-dom';

import { withCookies } from 'react-cookie';

import ApolloClient, { gql } from 'apollo-boost';

import { ApolloProvider  } from '@apollo/react-hooks';
import { Query, Mutation } from '@apollo/react-components';

import Authorization from './Authorization';

import Login      from './Login';
import Navigation from './Navigation';

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


function render_content(client)
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


class Application extends React.Component
{
  constructor(props)
  {
    super(props);

    const { cookies } = props;

    cookies.remove('token');

    this.state =
      {
        token: cookies.get('token')
      };

    const config =
      {
        uri: 'http://localhost:4000/graphql',

        request: (operation) =>
        {
          const context =
            {
              headers:
                {
                  authorization: `Bearer ${ this.state.token }`
                }
            };

          operation.setContext(context);
        }
      };

    this.client = new ApolloClient(config);
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

      <Authorization.Provider value={ { login } }>
        <Container>
          <BrowserRouter>
            <Navigation/>
            <Switch>
              <Route path='/' exact={ true }>
                <div>hi</div>
              </Route>
              <Route path='/login' component={ Login }/>
              <RoutePrivate path='/management' user={ { token: this.state.token } }>
                {
                  render_content(this.client)
                }
              </RoutePrivate>
            </Switch>
          </BrowserRouter>
        </Container>
      </Authorization.Provider>
    ;

    return element;
  }
}


export default withCookies(Application);

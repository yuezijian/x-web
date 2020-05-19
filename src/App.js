import React from 'react';

import Button    from 'react-bootstrap/Button';
import Col       from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Form      from 'react-bootstrap/Form';
import Table     from 'react-bootstrap/Table';

import ApolloClient, { gql } from 'apollo-boost';

import { ApolloProvider  } from '@apollo/react-hooks';
import { Query, Mutation } from '@apollo/react-components';


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

const config =
  {
    uri: 'http://localhost:4000/graphql',

    request: (operation) =>
    {
      const token = '';

      const context =
        {
          headers:
            {
              authorization: `Bearer ${ token }`
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
        ({ loading, error, data }) =>
        {
          if (loading)
          {
            return <p>Loading...</p>;
          }

          if (error)
          {
            return <p>{ error.toString() }</p>;
          }

          return render_table(data.items);
        }
      }
    </Query>
  ;

  return element;
}


function App()
{
  const element =

    <Container className='p-3'>
      <ApolloProvider client={ client }>
        {
          render_mutation()
        }
        <p/>
        {
          render_query()
        }
      </ApolloProvider>
    </Container>
  ;

  return element;
}


export default App;

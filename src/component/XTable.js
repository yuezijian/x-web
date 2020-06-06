import React from 'react';

import { gql } from 'apollo-boost';

import Button from 'react-bootstrap/Button';
import Table  from 'react-bootstrap/Table';

import XMutation from './XMutation';

import XForm from './XForm';


const gql_request =
  {
    item_remove:
      `
        mutation($id: ID!)
        {
          item_remove(id: $id)
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

    item_update:
      `
        mutation($id: ID!, $name: String!)
        {
          item_update(id: $id, name: $name)
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

    on_item_add: gql
      `
        subscription
        {
          on_item_add
          {
            id
            name
          }
        }
      `,

    on_item_remove: gql
      `
        subscription
        {
          on_item_remove
          {
            id
            name
          }
        }
      `,

    on_item_update: gql
      `
        subscription
        {
          on_item_update
          {
            id
            name
          }
        }
      `
  };


function random_string()
{
  return (Math.random() + 0.1).toString(36).substring(2);
}

class XTable extends React.Component
{
  componentDidMount()
  {
    const option_add =
      {
        document: gql_request.on_item_add,

        updateQuery: (previous, { subscriptionData }) =>
        {
          if (!subscriptionData.data)
          {
            return previous;
          }

          const item = subscriptionData.data.on_item_add;

          return Object.assign({}, { items: [...previous.items, item] });
        }
      };

    const option_remove =
      {
        document: gql_request.on_item_remove,

        updateQuery: (previous, { subscriptionData }) =>
        {
          if (!subscriptionData.data)
          {
            return previous;
          }

          const item = subscriptionData.data.on_item_remove;

          return Object.assign({}, { items: previous.items.filter((object) => object.id !== item.id) });
        }
      };

    const option_update =
      {
        document: gql_request.on_item_update,

        updateQuery: (previous, { subscriptionData }) =>
        {
          if (!subscriptionData.data)
          {
            return previous;
          }

          const item = subscriptionData.data.on_item_update;

          previous.items.find((object) => object.id === item.id).name = item.name;

          return Object.assign({}, previous);
        }
      };

    this.props.subscribe(option_add);
    this.props.subscribe(option_remove);
    this.props.subscribe(option_update);
  }

  render()
  {
    const row = (item) =>
    {
      const tr =

        <tr key={ item.id }>
          <td>{ item.id   }</td>
          <td>{ item.name }</td>
          <td>
            <XMutation mutation={ gql_request.item_update }>
              {
                (submit) =>
                {
                  const button =
                    <
                      Button
                      variant = 'warning'
                      size    = 'sm'
                      onClick = { () => submit({ variables: { id: item.id, name: random_string() } }) }
                    >
                      Update
                    </Button>
                  ;

                  return button;
                }
              }
            </XMutation>
          </td>
          <td>
            <XMutation mutation={ gql_request.item_remove }>
              {
                (submit) =>
                {
                  const button =
                    <
                      Button
                      variant = 'danger'
                      size    = 'sm'
                      onClick = { () => submit({ variables: { id: item.id } }) }
                    >
                      Remove
                    </Button>
                  ;

                  return button;
                }
              }
            </XMutation>
          </td>
        </tr>
      ;

      return tr;
    }

    const element =

      <Table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Option</th>
          <th>Option</th>
        </tr>
        </thead>
        <tbody>
        {
          this.props.data.items.map(row)
        }
        </tbody>
      </Table>
    ;

    return element;
  }
}


export default XTable;

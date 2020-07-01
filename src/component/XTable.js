import React from 'react';

import XMutation from './XMutation';

import gql_request from '../gql_request';

import subscribe_option from '../subscribe_option';

import misc from '../misc';

import Table from './control/Table';


function op_add(previous, data)
{
  const item = data.on_item_add;

  const items = [...previous.items, item];

  return { items };
}

function op_remove(previous, data)
{
  const item = data.on_item_remove;

  const items = previous.items.filter((object) => object.id !== item.id);

  return { items };
}

function op_update(previous, data)
{
  const item = data.on_item_update;

  const items = [...previous.items];

  items.find((object) => object.id === item.id).name = item.name;

  return { items };
}


function ItemUpdate(props)
{
  const element =

    <XMutation request={ { mutation: gql_request.item_update } }>
      {
        (submit) =>
        {
          const button =
            <
              button
              type      = 'button'
              className = 'btn btn-warning'
              onClick   = { () => submit({ id: props.item.id, name: misc.random_string() }) }
            >
              更新
            </button>
          ;

          return button;
        }
      }
    </XMutation>
  ;

  return element;
}

function ItemRemove(props)
{
  const element =

    <XMutation request={ { mutation: gql_request.item_remove } }>
      {
        (submit) =>
        {
          const button =
            <
              button
              type      = 'button'
              className = 'btn btn-danger'
              onClick   = { () => submit({ id: props.item.id }) }
            >
              移除
            </button>
          ;

          return button;
        }
      }
    </XMutation>
  ;

  return element;
}


class XTable extends React.Component
{
  componentDidMount()
  {
    this.props.subscribe(subscribe_option(gql_request.on_item_add,    op_add   ));
    this.props.subscribe(subscribe_option(gql_request.on_item_remove, op_remove));
    this.props.subscribe(subscribe_option(gql_request.on_item_update, op_update));
  }

  render()
  {
    const row = (item) =>
    {
      const tr =

        <tr key={ item.id }>
          <td>{ item.id   }</td>
          <td>{ item.name }</td>
          <td><ItemUpdate item={ item }/></td>
          <td><ItemRemove item={ item }/></td>
        </tr>
      ;

      return tr;
    }

    const element =

      <Table>
        <Table.Head data={ ['索引', '名称', '', ''] }/>
        <Table.Body>
          {
            this.props.data.items.map(row)
          }
        </Table.Body>
      </Table>
    ;

    return element;
  }
}


export default XTable;

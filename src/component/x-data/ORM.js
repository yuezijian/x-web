import React, { useState } from 'react';

import Button from '../control/Button';
import Form   from '../control/Form';
import List   from '../control/List';
import Table  from '../control/Table';

import XMutation from '../XMutation';
import XQuery from '../XQuery';


const request =
  {
    query:
      `
        query
        {
          orm
          {
            name
            note

            properties
            {
              name
              type
              not_null
              default_value
              note
            }
          }
        }
      `,

    mutation:
      `
        mutation($name: String!)
        {
          object_add(name: $name)
          {
            success
            message
            object
            {
              name
              note

              properties
              {
                name
                type
                not_null
                default_value
                note
              }
            }
          }
        }
      `
  };


function View(props)
{
  const [ object_name, SetObjectName ] = useState('');

  const [ properties, SetProperties ] = useState([]);

  const [ id,  SetID  ] = useState(-1);

  const item_object = (object, index) =>
  {
    const click = () =>
    {
      SetProperties(object.properties);

      SetID(object.id);
    };

    const item =

      <List.Item key={ index } active={ id === object.id } click={ click }>
        {
          object.name
        }
      </List.Item>
    ;

    return item;
  };

  const filter = ['name', 'type', 'not_null', 'default_value', 'note'];

  const update_object = (current, data) =>
  {
    const orm = current.orm.concat([data.object_add.object]);

    console.log(data.object_add.object);

    console.log(orm);

    return { orm };
  };

  const element =

    <div className='row'>
      <div className='col-3'>

        <div className='row'>
          <div className='col'>
            <Form inline>
              <
                Form.Control.Input
                value       = { object_name }
                on_change   = { event => SetObjectName(event.target.value) }
                placeholder = '名称'
              />
              <XMutation request={ request } update={ update_object }>
                {
                  (submit) =>
                  {
                    return <Button click={ () => submit({ name: object_name }) }>新增</Button>;
                  }
                }
              </XMutation>
            </Form>
          </div>
        </div>
        <div className='row mt-2'>
          <div className='col'>
            <List>
              {
                props.objects.map(item_object)
              }
              <List.Item>
                <div className='text-secondary text-center'>. . .</div>
              </List.Item>
            </List>
          </div>
        </div>
      </div>

      <div className='col'>

        <Table hover>
          <Table.Head data={ ['名称', '类型', '不为空', '默认值', '备注'] }/>
          <Table.Body>
            {
              properties.map(property => <Table.Row data={ property } filter={ filter }/>)
            }
            <tr>
              <td>+</td>
              <td/>
              <td/>
              <td/>
              <td/>
            </tr>
          </Table.Body>
        </Table>

        {/*<Table.Auto data={ properties } hover/>*/}

      </div>
    </div>
  ;

  return element;
}


function ORM(props)
{
  const element =

    <XQuery request={ request }>
      {
        (data) =>
        {
          const process = (value, index) =>
          {
            value.id = index;

            // value.properties.forEach(v => delete v.__typename);
          };

          data.orm.forEach(process);

          return <View objects={ data.orm }/>
        }
      }
    </XQuery>
  ;

  return element;
}


export default ORM;

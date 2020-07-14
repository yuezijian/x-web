import React, { useState } from 'react';

import Grid from '../layout/Grid';

import Button from '../control/Button';
import Form   from '../control/Form';
import List   from '../control/List';
import Table  from '../control/Table';

import Entity from './Entity';

import XMutation from '../XMutation';
import XQuery from '../XQuery';
import Alert from "../control/Alert";


const request =
  {
    query:
      `
        query
        {
          project
          {
            name
            note

            entities
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
      `,

    mutation:
      `
        mutation($name: String!)
        {
          entity_add(name: $name)
          {
            success
            message
            entity
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


function render_entity(entity)
{
  const element =

    <div>
      <Grid.Row>
        <Grid.Column>
          <Entity key={ entity.id } data={ entity }/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <
            Table.Quick
            data   = { entity.properties }
            head   = { ['属性', '类型', '不为空', '默认值', '备注'] }
            filter = { ['name', 'type', 'not_null', 'default_value', 'note'] }
            hover
          />
        </Grid.Column>
      </Grid.Row>
    </div>
  ;

  return element;
}


function View(props)
{
  const [ entity, SetEntity ] = useState({ name: '', note: '', properties: []});

  const [ object_name, SetObjectName ] = useState('');

  const item_object = (object, index) =>
  {
    const click = () =>
    {
      SetEntity(object);
    };

    const item =

      <List.Item key={ index } type='button' active={ entity.id === object.id } click={ click }>
        {
          object.name
        }
      </List.Item>
    ;

    return item;
  };

  const update_list = (current, data) =>
  {
    const orm = current.orm.concat([data.entity_add.entity]);

    return { orm };
  };

  const todos =
    [
      '添加实体',
      '添加属性',
      '命名规则检查',
      '重复名称检查'
    ];

  const element =

    <div>
      <Grid.Row>
        <Grid.Column size={ 3 }>
          <List>
            {
              props.entities.map(item_object)
            }
            <List.Item key={ -1 } type='button' click={ () => console.log('') }>
              <div className='text-secondary text-center'>新实体</div>
            </List.Item>
          </List>
        </Grid.Column>
        <Grid.Column>
          {
            render_entity(entity)
          }
        </Grid.Column>
        <Grid.Column size='auto'>
          {
            todos.map((value, index) => <Alert.Info key={ index }>{ value }</Alert.Info>)
          }
        </Grid.Column>
      </Grid.Row>
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
          };

          data.project.entities.forEach(process);

          return <View entities={ data.project.entities }/>
        }
      }
    </XQuery>
  ;

  return element;
}


export default ORM;


// <Grid.Row>
//   <Grid.Column>
//     <Form inline>
//       <
//         Form.Control.Input
//         value       = { object_name }
//         on_change   = { event => SetObjectName(event.target.value) }
//         placeholder = '名称'
//       />
//       <XMutation request={ request } update={ update_list }>
//         {
//           (submit) =>
//           {
//             return <Button click={ () => submit({ name: object_name }) }>新增</Button>;
//           }
//         }
//       </XMutation>
//     </Form>
//   </Grid.Column>
// </Grid.Row>

import React, { useState } from 'react';

import Grid from '../control/Grid';

import Button from '../control/Button';
// import Form   from '../control/Form';
import List   from '../control/List';
import Table  from '../control/Table';

import Entity from './Entity';

// import XMutation from '../XMutation';
import XQuery from '../XQuery';
// import Alert from "../control/Alert";
import Tab from "../control/Tab";


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


function View(props)
{
  const [ entity, SetEntity ] = useState({ name: '', note: '', properties: [] });

  const item_entity =
    {
      render: value => value.name,

      click: value => SetEntity(value)
    };

  // const update_list = (current, data) =>
  // {
  //   const orm = current.orm.concat([data.entity_add.entity]);
  //
  //   return { orm };
  // };

  // const todos =
  //   [
  //     '添加实体',
  //     '修改实体',
  //     '添加属性',
  //     '命名规则检查',
  //     '重复名称检查'
  //   ];

  const element =

    <div className='mx-3'>
      <Grid.Row margin={ { top: 3 } }>
        <Grid.Column>
          <Button outline>新实体</Button>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row margin={ { top: 3 } }>
        <Grid.Column>
          <List data={ props.entities } element={ item_entity }/>
        </Grid.Column>
        <Grid.Column>
          <Tab>
            <Tab.Link to='#information'>基本信息</Tab.Link>
            <Tab.Link to='#property'   >属性</Tab.Link>
            <Tab.Link to='#association'>关系</Tab.Link>
          </Tab>
          <Tab.Content margin={ { top: 4 } }>
            <Tab.Panel id='information' show>
              <Entity key={ entity.id } data={ entity }/>
            </Tab.Panel>
            <Tab.Panel id='property'>
              <
                Table.Quick
                data   = { entity.properties }
                head   = { ['属性', '类型', '不为空', '默认值', '备注'] }
                filter = { ['name', 'type', 'not_null', 'default_value', 'note'] }
                borderless
                hover
              />
            </Tab.Panel>
            <Tab.Panel id='association'>Coming soon</Tab.Panel>
          </Tab.Content>
        </Grid.Column>
        {/*<Grid.Column size='auto'>*/}
        {/*  {*/}
        {/*    todos.map((value, index) => <Alert.Info key={ index }>{ value }</Alert.Info>)*/}
        {/*  }*/}
        {/*</Grid.Column>*/}
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

import React, { useState } from 'react';

// import D3SVG from './D3SVG';

import XQuery from './XQuery';

// import scene from './x-data/scene';
import Table from "./control/Table";
import List from "./control/List";
import Grid from "./layout/Grid";
import Button from "./control/Button";


const request =
  {
    query:
      `
        query
        {
          domains
          {
            name

            projects
            {
              name

              entities
              {
                name
                note

                properties
                {
                  name
                  type
                  note
                }
              }
            }
          }
        }
      `
  };



function init(data)
{
  let i_domain   = 0;
  let i_project  = 0;
  let i_entity   = 0;
  let i_property = 0;

  for (const domain of data.domains)
  {
    domain.id = i_domain++;

    for (const project of domain.projects)
    {
      project.id = i_project++;

      for (const entity of project.entities)
      {
        entity.id = i_entity++;

        for (const property of entity.properties)
        {
          property.id = i_property++;
        }
      }
    }
  }
}


function TheView(props)
{
  const [ project, SetProject ] = useState({ entities:   [] });
  const [ entity,  SetEntity  ] = useState({ properties: [] });

  const item_project = (value, index) =>
  {
    const click = () =>
    {
      SetProject(value)
    };

    const item =

      <List.Item key={ index } type='button' click={ click } active={ project.id === value.id }>
        {
          value.name
        }
        <span className='badge badge-dark'>{ value.entities.length }</span>
      </List.Item>
    ;

    return item;
  };

  const item_entity = (value, index) =>
  {
    const button =

      <Button.Dark key={ index } click={ () => SetEntity(value) } layout={ 'mr-1 mt-1' } active={ entity.id === value.id } small outline>
        {
          value.name
        }
        {
          value.note ? `[${ value.note }]` : null
        }
      </Button.Dark>
    ;

    return button;
  };

  const element =

    <Grid.Row>
      <Grid.Column size={ 2 }>
        <List>
          {
            props.projects.map(item_project)
          }
        </List>
      </Grid.Column>
      <Grid.Column>
        <Grid.Row>
          <Grid.Column>
            {
              project.entities.map(item_entity)
            }
            {
              entity.properties.length === 0 ? null
                :
                <Grid.Row layout='mt-2'>
                  <Grid.Column>
                    <
                      Table.Quick
                      data = { entity.properties }
                      head = { ['名称', '类型', '备注'] }
                      filter = { ['name', 'type', 'note'] }
                      hover
                    />
                  </Grid.Column>
                </Grid.Row>
            }
          </Grid.Column>
        </Grid.Row>
      </Grid.Column>
    </Grid.Row>
  ;

  return element;
}


function View()
{
  const element =

    <XQuery request={ request }>
      {
        (data) =>
        {
          init(data);

          return <TheView projects={ data.domains[0].projects }/>
          // return <D3SVG width={ 1200 } height={ 800 } scene={ scene } data={ data }/>
        }
      }
    </XQuery>
  ;

  return element;
}


export default View;

import React, { useState } from 'react';

// import D3SVG from './D3SVG';

import XQuery from './XQuery';

// import scene from './x-data/scene';
import Table from "./control/Table";
import List from "./control/List";
import Grid from "./layout/Grid";
import Button from "./control/Button";
import Collapse from "./control/Collapse";


const request =
  {
    query:
      `
        query
        {
          pg_domains
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

  for (const domain of data.pg_domains)
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
  const [ domain,  SetDomain  ] = useState({ projects:   [] });
  const [ project, SetProject ] = useState({ entities:   [] });
  const [ entity,  SetEntity  ] = useState({ properties: [] });

  const item_domain =
    {
      render: value => value.name,

      click: value => SetDomain(value),

      active: value => value.id === domain.id
    };

  const item_project =
    {
      render: value => [value.name, <div><span className='badge badge-dark'>{ value.entities.length }</span></div>],

      click: value => SetProject(value),

      active: value => value.id === project.id
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

  const item_entity_card = (value, index) =>
  {
    const body =
      <
        Table.Quick
        data = { value.properties }
        head = { ['名称', '类型', '备注'] }
        filter = { ['name', 'type', 'note'] }
        hover
      />;

    const item =
      <
        Collapse.Card
        key    = { index }
        id     = { index }
        parent = 'entity-list'
        head   = { `${ value.name } ${ value.note ? ` [ ${ value.note } ]` : '' }` }
        body   = { body }
      />
    ;

    return item;
  };

  const element =

    <div>
      <Grid.Row>
        <Grid.Column>
          <List.Quick data={ props.domains } item={ item_domain } horizontal/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row layout='mt-2'>
        <Grid.Column size={ 3 }>
          <List.Quick data={ domain.projects } item={ item_project }/>
        </Grid.Column>
        <Grid.Column>
          <Collapse id='entity-list'>
            {
              project.entities.map(item_entity_card)
            }
          </Collapse>
        </Grid.Column>
      </Grid.Row>
    </div>
  ;

  return element;
}


function PG_Show()
{
  const element =

    <XQuery request={ request }>
      {
        (data) =>
        {
          init(data);

          return <TheView domains={ data.pg_domains }/>
          // return <D3SVG width={ 1200 } height={ 800 } scene={ scene } data={ data }/>
        }
      }
    </XQuery>
  ;

  return element;
}


export default PG_Show;

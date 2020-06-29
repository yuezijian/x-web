import React, { useState } from 'react';

// import D3SVG from './D3SVG';

import XQuery from './XQuery';

// import scene from './x-data/scene';
import Table from "./control/Table";


const q =
  `
  query
  {
    domains
    {
      index
      name

      projects
      {
        index
        name

        objects
        {
          index
          name
          note

          properties
          {
            index
            name
            type
            note
          }
        }
      }
    }
  }
  `
;



function init(data)
{
  for (const domain of data.domains)
  {
    domain.expand = true;

    for (const project of domain.projects)
    {
      project.expand = true;

      for (const object of project.objects)
      {
        object.expand = false;
      }
    }
  }
}


function TheView(props)
{
  const [ objects, SetObjects ] = useState([]);

  const [ properties, SetProperties ] = useState([]);

  const [ i_project, SetIndexProject ] = useState(-1);
  const [ i_object,  SetIndexObject  ] = useState(-1);

  const item_project = (project, index) =>
  {
    const active = i_project === project.index ? ' active' : '';

    const style = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center' + active;

    const button =

      <
        button
        className = { style }
        type      = 'button'
        key       = { project.index }
        onClick   = { () => { SetObjects(project.objects); SetIndexProject(project.index); } }
      >
        { project.name }
        <span className='badge badge-dark'>{ project.objects.length }</span>
      </button>
    ;

    return button;
  };

  const item_object = (object, index) =>
  {
    const active = i_object === object.index ? ' active' : '';

    const style = 'btn btn-outline-dark btn-sm mr-1 my-1' + active;

    const button =

      <
        button
        className = { style }
        type      = 'button'
        key       = { object.index }
        onClick   = { () => { SetProperties(object.properties); SetIndexObject(object.index); } }
      >
        {
          object.name
        }
        {
          object.note ? `[${ object.note }]` : null
        }
      </button>
    ;

    return button;
  };

  const item_property = (property, index) =>
  {
    const tr =

      <tr key={ index }>
        <td>{ property.name }</td>
        <td>{ property.type }</td>
        <td>{ property.note }</td>
      </tr>
    ;

    return tr;
  };

  const element =

    <div className='row'>
      <div className='col-2'>
        <div className='list-group'>
          {
            props.projects.map(item_project)
          }
        </div>
      </div>
      <div className='col'>
        <div className='row'>
          <div className='col'>
            {
              objects.map(item_object)
            }
          </div>
        </div>
        {
          properties.length === 0 ? null
            :
            <div className='row mt-2'>
              <div className='col'>
                <
                  Table
                  head = { ['名称', '类型', '备注'] }
                  body = { () => properties.map(item_property) }
                  hover
                />
              </div>
            </div>

        }
      </div>
    </div>
  ;

  return element;
}


function View()
{
  const element =

    <XQuery query={ q }>
      {
        (data) =>
        {
          // init(data);

          return <TheView projects={ data.domains[0].projects }/>
          // return <D3SVG width={ 1200 } height={ 800 } scene={ scene } data={ data }/>
        }
      }
    </XQuery>
  ;

  return element;
}


export default View;

import React, { useState } from 'react';

import Button from '../control/Button';
import Table  from '../control/Table';

import XQuery from '../XQuery';


// <div>
//   <div className='row'>
//     <div className='col'>
//       <Button>新增属性</Button>
//       <Button>保存</Button>
//     </div>
//   </div>
//   <div className='row mt-2'>
//     <div className='col'>
//       <Table.Auto data={ properties } hover/>
//     </div>
//   </div>
// </div>

function View(props)
{
  const [ properties, SetProperties ] = useState([]);

  const [ i_object,  SetIndexObject  ] = useState(-1);

  const item_object = (object, index) =>
  {
    console.log(object)
    const active = i_object === object.index ? ' active' : '';

    const style = 'list-group-item list-group-item-action d-flex justify-content-between align-items-center' + active;

    const button =

      <
        button
        className = { style }
        type      = 'button'
        key       = { index }
        onClick   = { () => { SetProperties(object.properties); SetIndexObject(object.index); } }
      >
        { object.name }
      </button>
    ;

    return button;
  };

  const element =

    <div className='row'>
      <div className='col-2'>
        <div className='list-group'>
          {
            // props.objects.map(item_object)
          }
        </div>
      </div>
      <div className='col'>
        {
          properties.length === 0 ? null : <Table.Auto data={ properties } hover/>
        }
      </div>
    </div>
  ;

  return element;
}


const q =
  `
  query
  {
    orm
    {
      id
      name
      note

      properties
      {
        id
        name
        type
        note
      }
    }
  }
  `
;

function ORM(props)
{
  const element =

    <XQuery query={ q }>
      {
        (data) =>
        {
          return <View objects={ data.orm }/>
        }
      }
    </XQuery>
  ;

  return element;
}


export default ORM;

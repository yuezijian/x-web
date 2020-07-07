import React from 'react';


function List(props)
{
  const element =

    <div className='list-group'>
      {
        props.children
      }
    </div>
  ;

  return element;
}

List.Item = function ({ type, active, click, ...props })
{
  let style = 'list-group-item';

  style += active ? ' list-group-item-primary' : '';
  style += ' d-flex justify-content-between align-items-center';

  const element =
    <
      li
      className = { style }
      type      = { type }
      onClick   = { click }
    >
      {
        props.children
      }
    </li>
  ;

  return element;
};

List.Auto = function({ data })
{
  const element =

    <div className='list-group'>
      {
        data.map((value, index) =><List.Item key={ index }>{ value }</List.Item>)
      }
    </div>
  ;

  return element;
};


export default List;

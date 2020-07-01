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

List.Item = function ({ active, click, ...props })
{
  // const style = 'd-flex justify-content-between align-items-center';

  let style = 'list-group-item';

  style += active ? ' list-group-item-primary' : '';

  const element =
    <
      li
      className = { style }
      type      = 'button'
      onClick   = { click }
    >
      {
        props.children
      }
    </li>
  ;

  return element;
};


export default List;

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

List.Quick = function({ data, item, horizontal })
{
  let style = 'list-group';

  style += horizontal ? ' list-group-horizontal' : '';

  const callback = (value, index) =>
    <
      List.Item
      key    = { index }
      type   = 'button'
      click  = { () => item.click(value) }
      active = { item.active(value) }
    >
      {
        item.render(value)
      }
    </List.Item>
  ;

  const element =

    <div className={ style }>
      {
        data.map(callback)
      }
    </div>
  ;

  return element;
};


export default List;

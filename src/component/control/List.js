import React from 'react';


function List({ data, element, horizontal })
{
  const item = (value, index) =>
    <
      List.Item
      key    = { index }
      type   = 'button'
      click  = { element.click ? () => element.click(value) : null }
      active = { element.active ? element.active(value) : null }
    >
      {
        element.render(value)
      }
    </List.Item>
  ;

  return <List.Group horizontal={ horizontal }>{ data.map(item) }</List.Group>;
}

List.Group = function ({ horizontal, children, ...props })
{
  let style = 'list-group';

  style += horizontal ? ' list-group-horizontal' : '';

  const element =

    <div className={ style }>
      {
        children
      }
    </div>
  ;

  return element;
}

List.Item = function ({ type, active, click, ...props })
{
  let style = 'list-group-item';

  style += active ? ' list-group-item-primary' : '';

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


export default List;

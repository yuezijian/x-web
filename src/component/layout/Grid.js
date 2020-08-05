import React from 'react';

import layout from './Layout';


function Grid({ fluid, children, ...props })
{
  let style = 'container';

  style += fluid ? '-fluid' : '';
  style += layout(props);

  return <div className={ style } { ...props }>{ children }</div>;
}

Grid.Row = function ({ children, ...props })
{
  let style = 'row';

  style += layout(props);

  return <div className={ style } { ...props }>{ children }</div>
};

Grid.Column = function ({ size, children, ...props })
{
  let style = 'col';

  style += size ? `-${ size }` : '';
  style += layout(props);

  return <div className={ style } { ...props }>{ children }</div>
};


export default Grid;

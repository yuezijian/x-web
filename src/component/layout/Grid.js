import React from 'react';

import layout from './Layout';


function Grid({ fluid, children, ...props })
{
  let style = 'container';

  style += fluid ? '-fluid' : '';
  style += layout(props);

  return <div className={ style }>{ children }</div>;
}

Grid.Row = function({ children, ...props })
{
  let style = 'row';

  style += layout(props);

  return <div className={ style }>{ children }</div>
};

Grid.Column = function({ size, children })
{
  let style = 'col';

  style += size ? `-${ size }` : '';

  return <div className={ style }>{ children }</div>
};


export default Grid;

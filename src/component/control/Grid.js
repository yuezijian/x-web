import React from 'react';

import utility from './Utility';


function Grid({ fluid, children, ...props })
{
  let style = 'container';

  style += fluid ? '-fluid' : '';
  style += utility(props);

  return <div className={ style } { ...props }>{ children }</div>;
}

Grid.Row = function ({ children, ...props })
{
  let style = 'row';

  style += utility(props);

  return <div className={ style } { ...props }>{ children }</div>
};

Grid.Column = function ({ size, children, ...props })
{
  let style = 'col';

  // style += size ? `-${ size }` : '';
  // style += utility(props);

  return <div className={ style } { ...props }>{ children }</div>
};


export default Grid;

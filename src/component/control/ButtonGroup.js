import React from 'react';

import utility from './Utility';


function ButtonGroup({ small, children, ...props })
{
  let style = 'btn-group';

  if (small) style += ' btn-group-sm';

  style += utility(props);

  const element =

    <div className={ style } role='group'>
      {
        children
      }
    </div>
  ;

  return element;
}


export default ButtonGroup;

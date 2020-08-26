import React from 'react';

import ButtonGroup from './ButtonGroup';


function Toolbar({ children })
{
  const element =

    <div className='btn-toolbar' role='toolbar'>
      {
        children
      }
    </div>
  ;

  return element;
}

Toolbar.Group = function ({ children, ...props })
{
  return <ButtonGroup { ...props }>{ children }</ButtonGroup>;
};


export default Toolbar;

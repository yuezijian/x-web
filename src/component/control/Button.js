import React from 'react';


function Button({ children, ...props })
{
  const element =

    <button className='btn btn-primary mx-1' type='button'>
      {
        children
      }
    </button>
  ;

  return element;
}


export default Button;

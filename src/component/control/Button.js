import React from 'react';

import layout from '../layout/Layout';


function Button({ type, outline, small, click, active, children, ...props })
{
  let style = 'btn';

  type = type ? type : 'primary';

  style +=  ` btn-${ outline ? 'outline-' : '' }${ type }`;
  style += small ? ' btn-sm' : '';
  style += active ? ' active' : '';
  style += layout(props);

  const element =

    <button className={ style } type='button' onClick={ click } { ...props }>
      {
        children
      }
    </button>
  ;

  return element;
}

Button.Group = function ({ small, children, ...props })
{
  let style = 'btn-group';

  style += small ? ' btn-group-sm' : '';

  const element =

    <div className={ style } role='group'>
      {
        children
      }
    </div>
  ;

  return element;
};

Button.Type =
  {
    Primary(props)
    {
      return <Button type='primary' { ...props }/>;
    },

    Secondary(props)
    {
      return <Button type='secondary' { ...props }/>;
    },

    Success(props)
    {
      return <Button type='success' { ...props }/>;
    },

    Danger(props)
    {
      return <Button type='danger' { ...props }/>;
    },

    Dark(props)
    {
      return <Button type='dark' { ...props }/>;
    },

    Light(props)
    {
      return <Button type='light' { ...props }/>;
    }
  };


export default Button;

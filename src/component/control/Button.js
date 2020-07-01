import React from 'react';


function Button({ type, outline, small, click, children, ...props })
{
  let style = 'btn';

  type = type ? type : 'primary';

  style +=  ` btn-${ outline ? 'outline-' : '' }${ type }`;
  style += small ? ' btn-sm' : '';

  const element =

    <button className={ style } type='button' onClick={ click }>
      {
        children
      }
    </button>
  ;

  return element;
}

Button.Primary = function(props)
{
  return <Button type='primary' { ...props }/>;
};

Button.Secondary = function(props)
{
  return <Button type='secondary' { ...props }/>;
};

Button.Success = function(props)
{
  return <Button type='success' { ...props }/>;
};

Button.Danger = function(props)
{
  return <Button type='danger' { ...props }/>;
};


export default Button;


/*
            <div className='btn-group btn-group-sm' role='group'>
              <Button        outline>新增</Button>
              <Button.Danger outline>删除</Button.Danger>
            </div>

*/

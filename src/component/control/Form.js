import React from 'react';


function Form({ inline, children, ...props })
{
  let style = '';

  style += inline ? 'form-inline' : '';

  const element =

    <form className={ style }>
      {
        children
      }
    </form>
  ;

  return element;
}

Form.Inline = function(props)
{
  return <Form inline/>;
};

Form.Control = {};

Form.Control.Input = function({ on_change, ...props })
{
  const element =
    <
      input
      className   = 'form-control mr-2'
      type        = 'text'
      onChange    = { on_change }
      { ...props }
    />
  ;

  return element;
}


export default Form;

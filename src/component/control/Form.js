import React from 'react';

import utility from './Utility';


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

Form.Group = function ({ label, children })
{
  let style = 'form-group';

  style += label ? ' row' : '';

  const element =

    <div className={ style }>
      {
        label ? <label className='col-1 col-form-label'>{ label }</label> : null
      }
      {
        <div className='col'>{ children }</div>
      }
    </div>
  ;

  return element;
};

Form.Inline = function (props)
{
  return <Form inline/>;
};

Form.Control = {};

Form.Control.Label = function ({ text, ...props })
{
  let style = '';

  style += utility(props);

  return <label className={ style }>{ text }</label>;
}

Form.Control.Input = function ({ change, ...props })
{
  let style = 'form-control';

  style += utility(props);

  const element =
    <
      input
      className   = { style }
      type        = 'text'
      onChange    = { change }
      { ...props }
    />
  ;

  return element;
}

Form.Control.Textarea = function ({ on_change, ...props })
{
  let style = 'form-control';

  style += utility(props);

  const element =
    <
      textarea
      className = { style }
      onChange  = { on_change }
      { ...props }
    />
  ;

  return element;
}


export default Form;

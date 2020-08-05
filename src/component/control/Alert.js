import React from 'react';


function Alert({ type, children, ...props })
{
  let style = 'alert';

  style += ` alert-${ type ? type : 'primary' }`;

  const element =

    <div className={ style } role='alert'>
      {
        children
      }
    </div>
  ;

  return element;
}

Alert.Primary = function (props)
{
  return <Alert type='primary' { ...props }/>;
};

Alert.Secondary = function (props)
{
  return <Alert type='secondary' { ...props }/>;
};

Alert.Success = function (props)
{
  return <Alert type='success' { ...props }/>;
};

Alert.Danger = function (props)
{
  return <Alert type='danger' { ...props }/>;
};

Alert.Info = function (props)
{
  return <Alert type='info' { ...props }/>;
};


export default Alert;

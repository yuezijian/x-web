import React from 'react';


// function WithLayout(component)
// {
//   return React.createElement(component, Object.assign(component.props, { hello: 'wrap layout' }));
// }


function layout(props)
{
  return props.layout ? ` ${ props.layout }` : '';
}


export default layout;


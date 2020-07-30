import React from 'react';

import layout from '../layout/Layout';


function Tab(props)
{
  // justify-content-end

  const element =

    <ul className='nav nav-tabs' role='tablist'>
      {
        props.children
      }
    </ul>
  ;

  return element;
}

Tab.Link = function({ to, children, ...props})
{
  const element =

    <li className='nav-item' role='presentation'>
      <a className='nav-link' data-toggle='tab' href={ to } role='tab'>{ children }</a>
    </li>
  ;

  return element;
};

Tab.Content = function({ children, ...props})
{
  let style = 'tab-content';

  style += layout(props);

  return <div className={ style }>{ children }</div>;
};

Tab.Panel = function({ id, show, children, ...props})
{
  const element =

    <div className='tab-pane' id={ id } role='tabpanel'>
      {
        children
      }
    </div>
  ;

  return element;
};


export default Tab;

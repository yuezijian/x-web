import React from 'react';

import { Link } from 'react-router-dom';


function Navbar(props)
{
  return <nav className='nav navbar-expand'>{ props.children }</nav>;
}

Navbar.Brand = function(props)
{
  return <div className='navbar-brand'>{ props.children }</div>;
}

Navbar.Collapse = function({ children, ...props })
{
  const element =

    <div>
      <
        button
        type          = 'button'
        className     = 'navbar-toggler'
        data-toggle   = 'collapse'
        data-target   = '#content'
        aria-controls = 'content'
        aria-expanded = 'false'
        aria-label    = 'Toggle navigation'
      >
        <span className='navbar-toggler-icon'/>
      </button>
      <div className="collapse navbar-collapse" id="content">
      </div>
    </div>
  ;

  return element;
}

Navbar.Dropdown = function({ id, title, children, ...props })
{
  const element =

    <div>
      <
        div
        id            = { id }
        className     = 'nav-link dropdown-toggle'
        role          = 'button'
        data-toggle   = 'dropdown'
        aria-haspopup = 'true'
        aria-expanded = 'false'
      >
        {
          title
        }
      </div>
      <div className='dropdown-menu' aria-labelledby={ id }>
        {
          children
        }
      </div>
    </div>
  ;

  return element;
}

Navbar.Link = function({ children, ...props})
{
  return <Link className='nav-link' { ...props }>{ children }</Link>;
}


export default Navbar;

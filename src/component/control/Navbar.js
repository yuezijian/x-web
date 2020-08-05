import React from 'react';

import { Link } from 'react-router-dom';


function Navbar(props)
{
  const element =

    <nav className='navbar navbar-expand navbar-light bg-light'>
      {
        props.children
      }
    </nav>
  ;

  return element;
}

Navbar.Brand = function (props)
{
  return <div className='navbar-brand'>{ props.children }</div>;
};

Navbar.Navigation = function (props)
{
  return<ul className='navbar-nav mr-auto'>{ props.children }</ul>;
};

Navbar.Collapse = function ({ children, ...props })
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
};

Navbar.Link = function ({ children, ...props})
{
  const element =

    <li className='nav-item'>
      <Link className='nav-link' { ...props }>
        {
          children
        }
      </Link>
    </li>
  ;

  return element;
};

Navbar.Dropdown = function ({ id, title, children, ...props })
{
  const element =

    <li className='nav-item dropdown'>
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
    </li>
  ;

  return element;
};

Navbar.Dropdown.Link = function ({ children, ...props })
{
  const element =

    <Link className='dropdown-item' { ...props }>
      {
        children
      }
    </Link>
  ;

  return element;
};

Navbar.Dropdown.Divider = function ()
{
  return <div className='dropdown-divider'/>;
};


export default Navbar;

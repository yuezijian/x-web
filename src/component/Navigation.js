import React from 'react';

import { Link } from 'react-router-dom';

import Context from './Context';


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


class Navigation extends React.Component
{
  render()
  {
    const element =

      <Navbar>

        <Navbar.Brand>X-Web</Navbar.Brand>

        <Navbar.Link to='/'>首页</Navbar.Link>

        <Navbar.Dropdown id='technique' title='技术点'>
          <Navbar.Link to='/example/subscription'>订阅</Navbar.Link>
        </Navbar.Dropdown>

        <Navbar.Dropdown id='x-platform' title='二次开发平台'>
          <Navbar.Link to='/x-platform/data'>数据</Navbar.Link>
        </Navbar.Dropdown>

        <div className='dropdown ml-auto my-2'>
          <button type='button' className='btn btn-outline-secondary btn-sm dropdown-toggle' data-toggle='dropdown'>
            用户
          </button>
          <div className='dropdown-menu'>
            <Context.Consumer>
              {
                ({ cookies }) =>
                {
                  return <button type='button' className='dropdown-item' onClick={ () => cookies.remove('token') }>注销</button>
                }
              }
            </Context.Consumer>
          </div>
        </div>
      </Navbar>
    ;

    return element;
  }
}


export default Navigation;

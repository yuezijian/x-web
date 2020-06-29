import React from 'react';

import Context from './Context';

import Navbar from './control/Navbar';


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

        <Navbar.Dropdown id='x-data' title='二次开发平台'>
          <Navbar.Link to='/x-data/orm'>ORM</Navbar.Link>
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

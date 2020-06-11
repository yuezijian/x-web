import React from 'react';

import Dropdown    from 'react-bootstrap/Dropdown';
import Nav         from 'react-bootstrap/Nav';
import Navbar      from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import { LinkContainer } from 'react-router-bootstrap';

import Context from './Context';


class Navigation extends React.Component
{
  render()
  {
    const element =

      <Navbar>
        <Navbar.Brand>
          X-Web
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbar'/>
        <Navbar.Collapse id='navbar'>
          <LinkContainer to='/'><Nav.Link>首页</Nav.Link></LinkContainer>
          <NavDropdown title="技术点" id="dropdown-technique">
            <LinkContainer to='/example/subscription'><NavDropdown.Item>订阅</NavDropdown.Item></LinkContainer>
          </NavDropdown>
          <NavDropdown title="HIS-III" id="dropdown-his3">
            <LinkContainer to='/his3/order'><NavDropdown.Item>医嘱</NavDropdown.Item></LinkContainer>
          </NavDropdown>
        </Navbar.Collapse>
        <Dropdown alignRight={ true }>
          <Dropdown.Toggle variant='outline-secondary' size='sm' id="dropdown-basic">
            用户
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Context.Consumer>
              {
                ({ cookies }) =>
                {
                  return <Dropdown.Item as='button' onClick={ () => cookies.remove('token') }>注销</Dropdown.Item>
                }
              }
            </Context.Consumer>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>
    ;

    return element;
  }
}


export default Navigation;

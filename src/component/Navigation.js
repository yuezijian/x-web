import React from 'react';

import Nav    from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { LinkContainer } from 'react-router-bootstrap';


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
          <LinkContainer to='/'><Nav.Link>Home</Nav.Link></LinkContainer>
          <LinkContainer to='/management'><Nav.Link>Management</Nav.Link></LinkContainer>
        </Navbar.Collapse>
      </Navbar>
    ;

    return element;
  }
}


export default Navigation;

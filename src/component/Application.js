import React from 'react';

import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import
{
  BrowserRouter, Route, Switch
} from 'react-router-dom';

// import { Subscription } from '@apollo/react-components';

import Authorization from './Authorization';

import Navigation from './Navigation';

import XMutation from './XMutation';
import XQuery    from './XQuery';

import XForm  from './XForm';
import XTable from './XTable';

import gql_request from '../gql_request';


class Application extends React.Component
{
  render()
  {
    const element =

      <Authorization>
        <BrowserRouter>
          <Switch>
            <Route path='/' exact={ true }>
              <Container>
                <Row className='my-3'>
                  <Col>
                    <Navigation/>
                  </Col>
                </Row>
                <Row className='my-3'>
                  <Col>
                    <XMutation mutation={ gql_request.item_add }>
                      {
                        (submit) =>
                        {
                          return <XForm submit={ submit }/>;
                        }
                      }
                    </XMutation>
                  </Col>
                </Row>
                <Row className='my-3'>
                  <Col>
                    <XQuery query={ gql_request.items }>
                      {
                        (data, subscribe) =>
                        {
                          return <XTable data={ data } subscribe={ subscribe }/>;
                        }
                      }
                    </XQuery>
                  </Col>
                </Row>
              </Container>
            </Route>
          </Switch>
        </BrowserRouter>
      </Authorization>
    ;

    return element;
  }
}


export default Application;

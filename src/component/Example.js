import React from 'react';

import Container from 'react-bootstrap/Container';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import XMutation from './XMutation';
import XQuery    from './XQuery';

import XForm  from './XForm';
import XTable from './XTable';

import gql_request from '../gql_request';


function Subscription()
{
  const element =

    <Container>
      <Row>
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
  ;

  return element;
}


const Example = { Subscription };


export default Example;

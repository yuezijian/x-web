import React from 'react';

import Button from 'react-bootstrap/Button';
import Card   from 'react-bootstrap/Card';
import Form   from 'react-bootstrap/Form';

import request from 'request';

import Context from './Context';


class Login extends React.Component
{
  render()
  {
    const element =

      <Card>
        <Card.Header>请登录</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group>
              <Form.Control placeholder='用户名'/>
            </Form.Group>
            <Form.Group>
              <Form.Control type='password' placeholder='密码'/>
            </Form.Group>
          </Form>
          <Context.Consumer>
            {
              ({ cookies }) =>
              {
                const resolve = (token) =>
                {
                  cookies.set('token', token);

                  const history  = this.props.history;
                  const location = this.props.location;

                  const { from } = location.state || { from: { pathname: '/' } };

                  history.replace(from);
                }

                const reject = (error) =>
                {
                  console.log(error);
                };

                return <Button onClick={ () => this._submit({ resolve, reject }) }>登录</Button>;
              }
            }
          </Context.Consumer>
        </Card.Body>
      </Card>
    ;

    return element;
  }

  _submit(handler)
  {
    const param =
      {
        url: 'http://localhost:4000/authentication',

        form:
          {
            user:
              {
                name:     '',
                password: ''
              }
          }
      };

    const callback = (error, response, body) =>
    {
      error ? handler.reject(error) : handler.resolve(body);
    };

    request.post(param, callback)
  }
}


export default Login;

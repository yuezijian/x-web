import React from 'react';

import request from 'request';

import Context from './Context';


class Login extends React.Component
{
  render()
  {
    const element =

      <div className='card'>
        <div className='card-header'>请登录</div>
        <div className='card-body'>
          <form>
            <div className='form-group'>
              <input type='text' className='form-control' placeholder='用户名'/>
            </div>
            <div className='form-group'>
              <input type='password' className='form-control' placeholder='密码'/>
            </div>
          </form>
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

                return <button type='button' className='btn btn-primary' onClick={ () => this._submit({ resolve, reject }) }>登录</button>;
              }
            }
          </Context.Consumer>
        </div>
      </div>
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

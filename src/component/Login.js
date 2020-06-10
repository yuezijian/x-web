import React from 'react';

// import Button from 'react-bootstrap/Button';
// import Card   from 'react-bootstrap/Card';
// import Form   from 'react-bootstrap/Form';
//
// import request from 'request';
//
// import Authorization from './Authorization';
//
//
// class Login extends React.Component
// {
//   render()
//   {
//     const element =
//
//       <Card>
//         <Card.Header>请登录</Card.Header>
//         <Card.Body>
//           <Form>
//             <Form.Group>
//               <Form.Control placeholder='用户名'/>
//             </Form.Group>
//             <Form.Group>
//               <Form.Control type='password' placeholder='密码'/>
//             </Form.Group>
//           </Form>
//           <Authorization.Consumer>
//             {
//               ({ login }) => <Button onClick={ () => this._submit(login) }>登录</Button>
//             }
//           </Authorization.Consumer>
//         </Card.Body>
//       </Card>
//     ;
//
//     return element;
//   }
//
//   _submit(login)
//   {
//     const param =
//       {
//         url: 'http://localhost:4000/authentication',
//         form:
//           {
//             user:
//               {
//                 name:     '',
//                 password: ''
//               }
//           }
//       };
//
//     const callback = (error, response, body) =>
//     {
//       if (error)
//       {
//         console.log(error);
//       }
//       else
//       {
//         const history  = this.props.history;
//         const location = this.props.location;
//
//         const { from } = location.state || { from: { pathname: '/' } };
//
//         Promise.resolve(body)
//           .then((token) => login(token))
//           .then(() => history.replace(from))
//         ;
//       }
//     };
//
//     request.post(param, callback)
//   }
// }


function Login()
{
  return <div>login</div>;
}


export default Login;

import React from 'react';

// import { BrowserRouter, Route, Switch } from 'react-router-dom';

// import { ApolloProvider  } from '@apollo/react-hooks';

// import { CookiesProvider, withCookies } from 'react-cookie';

// import Context from './Context';

// import Authorization from './Authorization';

// import Navigation from './Navigation';

// import client from '../client';

// import Grid from './control/Grid';

import XEditor from './XEditor';
// import XView   from './XView';
// import Example from './Example';
// import ORM     from './x-data/ORM';
// import PGS from './PGS';


// class Application extends React.Component
// {
//   render()
//   {
//     const { cookies } = this.props;
//
//     const element =
//
//       <CookiesProvider>
//         <Context.Provider value={ { cookies } }>
//           <ApolloProvider client={ client({ token: () => cookies.get('token') }) }>
//             <Authorization enable={ false }>
//               <Grid fluid>
//                 <BrowserRouter>
//                   <div className='row'>
//                     <div className='col'>
//                       <Navigation/>
//                     </div>
//                   </div>
//                   <div className='row'>
//                     <div className='col'>
//                       <Switch>
//                         <Route path='/' exact={ true }>
//                           <XView/>
//                         </Route>
//                         <Route path='/his3'>
//                           <PGS/>
//                         </Route>
//                         <Route path='/x-data/orm'>
//                           <ORM/>
//                         </Route>
//                         <Route path='/example/subscription'>
//                           <Example.Subscription/>
//                         </Route>
//                         <Route path='/editor'>
//                           <XEditor/>
//                         </Route>
//                       </Switch>
//                     </div>
//                   </div>
//                 </BrowserRouter>
//               </Grid>
//             </Authorization>
//           </ApolloProvider>
//         </Context.Provider>
//       </CookiesProvider>
//     ;
//
//     return element;
//   }
// }
//
//
// export default withCookies(Application);


class Application extends React.Component
{
  render()
  {
    const element =

      <div className='container-fluid'>
        <div className='row mt-3'>
          <div className='col'>
            <XEditor/>
          </div>
        </div>
      </div>;

    return element;
  }
}

export default Application;

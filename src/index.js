import React    from 'react';
import ReactDOM from 'react-dom';

import { ApolloProvider  } from '@apollo/react-hooks';

import { CookiesProvider } from 'react-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';

import Application from './component/Application.js';

import client from './client';


const element =

  <ApolloProvider client={ client }>
    <CookiesProvider>
      <Application/>
    </CookiesProvider>
  </ApolloProvider>
;

ReactDOM.render(element, document.getElementById('root'));

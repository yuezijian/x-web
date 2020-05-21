import React    from 'react';
import ReactDOM from 'react-dom';

import { CookiesProvider } from 'react-cookie';

import 'bootstrap/dist/css/bootstrap.min.css';

import Application from './Application.js';


const element =

  <CookiesProvider>
    <Application/>
  </CookiesProvider>
;

ReactDOM.render(element, document.getElementById('root'));

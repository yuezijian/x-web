import React    from 'react';
import ReactDOM from 'react-dom';

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';

import './scss/theme.css';


import Application from './component/Application';


const element =

  // <React.StrictMode>
    <Application/>
  // </React.StrictMode>
;

ReactDOM.render(element, document.getElementById('root'));

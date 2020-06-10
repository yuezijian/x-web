import { ApolloClient  } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import link from './link';


const host = '10.68.15.46';
const port = 4000;

const g_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1OTE3NzYzMTB9.bNsBKRxCWWCgly_bSB3sp0dst84m1_Sadiz5hEha7pA';

const config =
  {
    link: link(host, port, { token: () => g_token }),

    cache: new InMemoryCache()
  };

const client = new ApolloClient(config);


export default client;

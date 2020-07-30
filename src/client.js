import { ApolloClient  } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import link from './link';


// const host = '10.68.15.46';
// const host = '10.68.12.222';
const host = 'localhost';
const port = 4000;
// const port = 4444;


function client(authorization)
{
  const config =
    {
      link: link(host, port, authorization),

      cache: new InMemoryCache()
    };

  return new ApolloClient(config);
}


export default client;

import { ApolloClient  } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';

import link from './link';


const host = '10.68.15.46';
const port = 4000;


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

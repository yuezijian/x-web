import React from 'react';

import ApolloClient, { gql } from 'apollo-boost';

import { ApolloProvider } from '@apollo/react-hooks';
import { Query          } from '@apollo/react-components';


const config =
  {
    uri: 'http://localhost:4000/graphql',

    request: (operation) =>
    {
      const token = '';

      const context =
        {
          headers:
            {
              authorization: `Bearer ${ token }`
            }
        };

      operation.setContext(context);
    }
  }

const client = new ApolloClient(config);


function App()
{
  const element =

    <div>
      <ApolloProvider client={ client }>
        <Query query={ gql`{ hi }` }>
          {
            ({ loading, error, data }) =>
            {
              if (loading)
              {
                return <p>Loading...</p>;
              }

              if (error)
              {
                return <p>{ error.toString() }</p>;
              }

              return <div>{ data.hi }</div>;
            }
          }
        </Query>
      </ApolloProvider>
    </div>
  ;

  return element;
}


export default App;

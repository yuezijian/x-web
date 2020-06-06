import { ApolloClient      } from 'apollo-client';
import { InMemoryCache     } from 'apollo-cache-inmemory';
import { ApolloLink        } from 'apollo-link';
import { HttpLink          } from 'apollo-link-http';
import { WebSocketLink     } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';


const host = 'localhost';
const port = 4000;

const link_test = ({ query }) =>
{
  const { kind, operation } = getMainDefinition(query);

  return kind === 'OperationDefinition' && operation === 'subscription';
};

const link_http      = new HttpLink({ uri: `http://${ host }:${ port }/graphql` });
const link_websocket = new WebSocketLink({ uri: `ws://${ host }:${ port }/subscriptions`, options: { reconnect: true } });

const config =
  {
    link: ApolloLink.split(link_test, link_websocket, link_http),
    cache: new InMemoryCache()
  };

const client = new ApolloClient(config);


export default client;


// /*
// import { split } from 'apollo-link';
// import { HttpLink } from 'apollo-link-http';
// import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from 'apollo-utilities';
//
//
// const httpLink = new HttpLink({
//   uri: 'http://localhost:3000/graphql'
// });
//
// const wsLink = new WebSocketLink({
//   uri: `ws://localhost:5000/`,
//   options: {
//     reconnect: true
//   }
// });
//
// const link = split(
//   ({ query }) => {
//     const definition = getMainDefinition(query);
//     return (
//       definition.kind === 'OperationDefinition' &&
//       definition.operation === 'subscription'
//     );
//   },
//   wsLink,
//   httpLink,
// );
// */
//
// // import ApolloClient from 'apollo-boost';
//
//
// import { ApolloClient } from 'apollo-client';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { HttpLink } from 'apollo-link-http';
// import { onError } from 'apollo-link-error';
// import { withClientState } from 'apollo-link-state';
// import { ApolloLink, Observable } from 'apollo-link';
//
//
// const cache = new InMemoryCache({
//   cacheRedirects:
//     {
//     Query:
//       {
//       movie: (_, { id }, { getCacheKey }) =>
//         getCacheKey({ __typename: 'Movie', id })
//     }
//   }
// });
//
// const request = async (operation) => {
//   // const token = await AsyncStorage.getItem('token');
//   // operation.setContext({
//   //   headers: {
//   //     authorization: token
//   //   }
//   // });
// };
//
// const requestLink = new ApolloLink((operation, forward) =>
//   new Observable(observer => {
//     let handle;
//     Promise.resolve(operation)
//       .then(oper => request(oper))
//       .then(() => {
//         handle = forward(operation).subscribe({
//           next: observer.next.bind(observer),
//           error: observer.error.bind(observer),
//           complete: observer.complete.bind(observer),
//         });
//       })
//       .catch(observer.error.bind(observer));
//
//     return () => {
//       if (handle) handle.unsubscribe();
//     };
//   })
// );
//
//
// function create_client(token)
// {
//   const config =
//     {
//       link: ApolloLink.from([
//         onError(({ graphQLErrors, networkError }) =>
//         {
//           if (graphQLErrors)
//           {
//             // sendToLoggingService(graphQLErrors);
//           }
//
//           if (networkError)
//           {
//             // logoutUser();
//           }
//         }),
//
//         requestLink,
//
//         withClientState({
//           defaults:
//             {
//             isConnected: true
//           },
//           resolvers:
//             {
//             Mutation:
//               {
//               updateNetworkStatus: (_, { isConnected }, { cache }) =>
//               {
//                 cache.writeData({ data: { isConnected }});
//
//                 return null;
//               }
//             }
//           },
//           cache
//         }),
//         new HttpLink({
//           uri: 'http://localhost:4000/graphql',
//           credentials: 'include'
//         })
//       ]),
//       cache
//     };
//
//   const config1 =
//     {
//       uri: 'http://localhost:4000/graphql',
//
//       request: (operation) =>
//       {
//         const context =
//           {
//             headers:
//               {
//                 authorization: `Bearer ${ token() }`
//               }
//           };
//
//         operation.setContext(context);
//       }
//     };
//
//   return new ApolloClient(config);
// }
//
//
// export default create_client;

import { ApolloLink, Observable } from 'apollo-link';

import { HttpLink      } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';

import { getMainDefinition } from 'apollo-utilities';


function link(host, port, authorization)
{
  const context =
    {
      headers:
        {
          authorization: `Bearer ${ authorization.token() }`
        }
    };

  const handler = (operation, forward) =>
  {
    const value = observer =>
    {
      let handle;

      const subscription =
        {
          next:     observer.next.bind(observer),
          error:    observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        };

      Promise.resolve(operation)
        .then(operation => operation.setContext(context))
        .then(() => { handle = forward(operation).subscribe(subscription); })
        .catch(observer.error.bind(observer))
      ;

      return () =>
      {
        if (handle)
        {
          handle.unsubscribe();
        }
      };
    };

    return new Observable(value);
  };

  const link_auth = new ApolloLink(handler);
  const link_http = new HttpLink({ uri: `http://${ host }:${ port }/graphql` });
  const link_ws   = new WebSocketLink({ uri: `ws://${ host }:${ port }/graphql`, options: { reconnect: true } });

  const test = ({ query }) =>
  {
    const { kind, operation } = getMainDefinition(query);

    return kind === 'OperationDefinition' && operation === 'subscription';
  };

  return ApolloLink.split(test, link_ws, ApolloLink.from([link_auth, link_http]));
}


export default link;

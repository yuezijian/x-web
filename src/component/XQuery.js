import React from 'react';

import { Query } from '@apollo/react-components';


function XQuery(props)
{
  const element =

    <Query query={ props.query }>
      {
        ({ loading, error, data, networkStatus, subscribeToMore }) =>
        {
          if (loading)
          {
            return <p>加载中...</p>;
          }

          if (error)
          {
            return <p>{ error.toString() }</p>;
          }

          const subscribe = () =>
          {
            const option =
              {
                document: props.document,

                updateQuery: (previous, { subscriptionData }) =>
                {
                  if (!subscriptionData.data)
                  {
                    return previous;
                  }

                  const item = subscriptionData.data.item_add;

                  return Object.assign({}, previous, { items: [...previous.items, item] });
                }
              };

            subscribeToMore(option)
          };

          return props.component(data, subscribe);
        }
      }
    </Query>
  ;

  return element;
}


export default XQuery;

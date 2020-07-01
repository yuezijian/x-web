import React from "react";

import { gql } from 'apollo-boost';

import { Mutation } from '@apollo/react-components';


function XMutation({ request, update, children})
{
  const logic = update ? (cache, { data }) =>
    {
      const query = gql(request.query);

      const current = cache.readQuery({ query });

      cache.writeQuery({ query, data: update(current, data) })
    }
    : null
  ;

  const element =

    <Mutation mutation={ gql(request.mutation) } update={ logic }>
      {
        (mutate) =>
        {
          return children(variables => mutate({ variables }));
        }
      }
    </Mutation>
  ;

  return element;
}


export default XMutation;

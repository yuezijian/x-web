import React from "react";

import { gql } from 'apollo-boost';

import { Mutation } from '@apollo/react-components';


function XMutation(props)
{
  const element =

    <Mutation mutation={ gql(props.mutation) }>
      {
        (mutate) =>
        {
          return props.children(mutate);
        }
      }
    </Mutation>
  ;

  return element;
}


export default XMutation;

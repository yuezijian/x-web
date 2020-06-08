import React from 'react';

import Spinner from 'react-bootstrap/Spinner';

import { gql } from 'apollo-boost';

import { Query } from '@apollo/react-components';


function XQuery(props)
{
  const element =

    <Query query={ gql(props.query) }>
      {
        ({ loading, error, data, networkStatus, subscribeToMore }) =>
        {
          if (loading)
          {
            return <Spinner size='sm' animation='border'/>;
          }

          if (error)
          {
            return <p>{ error.toString() }</p>;
          }

          return props.children(data, subscribeToMore);
        }
      }
    </Query>
  ;

  return element;
}


export default XQuery;

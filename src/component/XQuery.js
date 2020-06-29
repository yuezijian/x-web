import React from 'react';

import { gql } from 'apollo-boost';

import { useQuery } from '@apollo/react-hooks';

import Spinner from './control/Spinner';


function XQuery(props)
{
  const option =
    {
      fetchPolicy: 'network-only'
    };

  const { loading, error, data, subscribeToMore } = useQuery(gql(props.query), option);

  if (loading)
  {
    return <Spinner/>;
  }

  if (error)
  {
    return <p>{ error.toString() }</p>;
  }

  return props.children(data, subscribeToMore);
}


export default XQuery;

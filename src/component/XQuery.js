import React from 'react';

import { gql } from 'apollo-boost';

import { useQuery } from '@apollo/react-hooks';

import Spinner from './control/Spinner';


function XQuery({ request, children })
{
  const option =
    {
      fetchPolicy: 'network-only'
    };

  const { loading, error, data, subscribeToMore } = useQuery(gql(request.query), option);

  if (loading)
  {
    return <Spinner/>;
  }

  if (error)
  {
    return <p>{ error.toString() }</p>;
  }

  return children(data, subscribeToMore);
}


export default XQuery;

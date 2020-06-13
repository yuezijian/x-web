import React from 'react';

import XMutation from './XMutation';
import XQuery    from './XQuery';

import XForm  from './XForm';
import XTable from './XTable';

import gql_request from '../gql_request';


function Subscription()
{
  const element =

    <div>
      <div className='row'>
        <div className='col'>
          <XMutation mutation={ gql_request.item_add }>
            {
              (submit) =>
              {
                return <XForm submit={ submit }/>;
              }
            }
          </XMutation>
        </div>
      </div>
      <div className='row my-2'>
        <div className='col'>
          <XQuery query={ gql_request.items }>
            {
              (data, subscribe) =>
              {
                return <XTable data={ data } subscribe={ subscribe }/>;
              }
            }
          </XQuery>
        </div>
      </div>
    </div>
  ;

  return element;
}


const Example = { Subscription };


export default Example;

import React, { useState } from 'react';

import misc from '../misc';


// function render_mutation(component, text)
// {
//   const update = (cache, { data: { item_add } }) =>
//   {
//     const { items } = cache.readQuery({ query: gql_request.items });
//
//     cache.writeQuery({ query: gql_request.items, data: { items: items.concat([item_add.item]) } })
//   };
//
//   const element =
//
//     <Mutation mutation={ gql_request.item_add } variables={ { text } }>
//       {
//         (mutate) =>
//         {
//           return component(mutate);
//         }
//       }
//     </Mutation>
//   ;
//
//   return element;
// }



function XForm(props)
{
  const [text, SetText] = useState(misc.random_string());

  const submit = () =>
  {
    props.submit({ text });

    SetText(misc.random_string());
  }

  const element =

    <form className='form-inline'>
      <
        input
        type      = 'text'
        className = 'form-control form-control-sm'
        value     = { text }
        onChange  = { (event) => SetText(event.target.value) }
      />
      <button type='button' className='btn btn-primary btn-sm mx-1' onClick={ submit }>添加</button>
    </form>
  ;

  return element;
}


export default XForm;

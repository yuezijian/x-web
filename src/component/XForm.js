import React, { useState } from "react";

import Col    from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form   from 'react-bootstrap/Form';

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
    props.submit({ variables: { text } });

    SetText(misc.random_string());
  }

  const element =

    <Form>
      <Form.Row>
        <Col>
          <Form.Control size='sm' value={ text } onChange={ (event) => SetText(event.target.value) }/>
        </Col>
        <Col>
          <Button size='sm' onClick={ submit }>添加</Button>
        </Col>
      </Form.Row>
    </Form>
  ;

  return element;
}


export default XForm;

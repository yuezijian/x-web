import React, { useState } from "react";

import Col    from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form   from 'react-bootstrap/Form';


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



function random_string()
{
  return (Math.random() + 0.1).toString(36).substring(2);
}

function XForm(props)
{
  const [text, SetText] = useState(random_string());

  const callback = () =>
  {
    props.submit({ variables: { text } });

    SetText(random_string());
  }

  const element =

    <Form>
      <Form.Row>
        <Col>
          <Form.Control size='sm' value={ text } onChange={ (event) => SetText(event.target.value) }/>
        </Col>
        <Col>
          <Button size='sm' onClick={ callback }>Add</Button>
        </Col>
      </Form.Row>
    </Form>
  ;

  return element;
}


export default XForm;

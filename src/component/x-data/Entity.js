import React, { useState } from 'react';

import Form from '../control/Form';


function Entity({ data })
{
  const [name, SetName] = useState(data.name);
  const [note, SetNote] = useState(data.note);

  const element =

    <Form>
      <Form.Group label='名称'>
        <Form.Control.Input value={ name } change={ event => SetName(event.target.value) }/>
      </Form.Group>
      <Form.Group label='备注'>
        <Form.Control.Input value={ note } change={ event => SetNote(event.target.value) }/>
      </Form.Group>
    </Form>
  ;

  return element;
}


export default Entity;

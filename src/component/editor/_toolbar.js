import React from 'react';

import { useSlate } from 'slate-react';

import Button from '../control/Button';
import Icon   from '../control/Icon';

import Block from './block';
import Mark  from './mark';


const Tool = ({ target, format, icon }) =>
{
  const editor = useSlate();

  const active = target.is_active(editor, format);

  const click = event =>
  {
    event.preventDefault();

    target.toggle(editor, format);
  };

  return <Button active={ active } click={ click } outline>{ icon }</Button>;
}

Tool.Null = ({ icon }) =>
{
  return <Button.Type.Secondary disabled>{ icon }</Button.Type.Secondary>;
}


function Toolbar()
{
  const element =

    <Button.Group>

      <Tool target={ Mark } format='bold'      icon=<Icon.Bold     />/>
      <Tool target={ Mark } format='italic'    icon=<Icon.Italic   />/>
      <Tool target={ Mark } format='underline' icon=<Icon.Underline/>/>

      <Tool target={ Block } format='h1' icon=<Icon.H1           />/>
      <Tool target={ Block } format='h2' icon=<Icon.H2           />/>
      <Tool target={ Block } format='ol' icon=<Icon.ListOrdered  />/>
      <Tool target={ Block } format='ul' icon=<Icon.ListUnordered/>/>

      <Tool.Null icon=<Icon.ListCheck/>/>
      <Tool.Null icon=<Icon.Table/>/>

    </Button.Group>
  ;

  return element;
}


export default Toolbar;

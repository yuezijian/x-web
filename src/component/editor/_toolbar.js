import React from 'react';

import { useSlate } from 'slate-react';

import Button from '../control/Button';
import Icon   from '../control/Icon';

import Block from './block';
import Mark  from './mark';


const Tool = ({ unit, format, icon }) =>
{
  const editor = useSlate();

  const active = unit.is_active(editor, format);

  const click = event =>
  {
    event.preventDefault();

    unit.toggle(editor, format);
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

      <Tool unit={ Mark } format='bold'      icon=<Icon.Bold     />/>
      <Tool unit={ Mark } format='italic'    icon=<Icon.Italic   />/>
      <Tool unit={ Mark } format='underline' icon=<Icon.Underline/>/>

      <Tool unit={ Block } format='h1' icon=<Icon.H1           />/>
      <Tool unit={ Block } format='h2' icon=<Icon.H2           />/>
      <Tool unit={ Block } format='ol' icon=<Icon.ListOrdered  />/>
      <Tool unit={ Block } format='ul' icon=<Icon.ListUnordered/>/>

      <Tool unit={ Block } format='image' icon=<Icon.Image/>/>

      <Tool.Null icon=<Icon.Table/>/>

      <Tool unit={ Mark } format='color' icon=<Icon.Brush/>/>

      <Tool.Null icon=<Icon.Printer/>/>

    </Button.Group>
  ;

  return element;
}


export default Toolbar;

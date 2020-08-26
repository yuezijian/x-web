import React, { useState } from 'react';

import { useSlate } from 'slate-react';

import Button  from '../control/Button';
import Icon    from '../control/Icon';
import Toolbar from '../control/Toolbar';

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

function Toggle({ value, children })
{
  const [state, SetState] = useState(value ? value : true );

  return <Button click={ () => SetState(!state) } outline>{ state ? <Icon.ToggleOn/> : <Icon.ToggleOff/>} { children }</Button>;
}

Tool.Toggle = function (props)
{
  return Toggle(props);
}

Tool.Null = ({ icon }) =>
{
  return <Button.Type.Secondary disabled>{ icon }</Button.Type.Secondary>;
}


function XEToolbar()
{
  const element =

    <Toolbar>
      <Toolbar.Group margin={ { right: 2 } }>
        <Tool.Toggle>设计模式</Tool.Toggle>
      </Toolbar.Group>
      <Toolbar.Group margin={ { right: 2 } }>
        <Tool unit={ Mark } format='bold'      icon=<Icon.Bold     />/>
        <Tool unit={ Mark } format='italic'    icon=<Icon.Italic   />/>
        <Tool unit={ Mark } format='underline' icon=<Icon.Underline/>/>
        <Tool unit={ Mark } format='color'     icon=<Icon.Brush    />/>
      </Toolbar.Group>
      <Toolbar.Group margin={ { right: 2 } }>
        <Tool unit={ Block } format='h1' icon=<Icon.H1           />/>
        <Tool unit={ Block } format='h2' icon=<Icon.H2           />/>
        <Tool unit={ Block } format='ol' icon=<Icon.ListOrdered  />/>
        <Tool unit={ Block } format='ul' icon=<Icon.ListUnordered/>/>
      </Toolbar.Group>
      <Toolbar.Group margin={ { right: 2 } }>
        <Tool unit={ Block } format='image' icon=<Icon.Image/>/>
        <Tool.Null icon=<Icon.Table/>/>
      </Toolbar.Group>
      <Toolbar.Group margin={ { right: 2 } }>
        <Tool.Null icon=<Icon.Printer/>/>
      </Toolbar.Group>
    </Toolbar>
  ;

  return element;
}


export default XEToolbar;

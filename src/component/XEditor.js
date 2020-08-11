import React, { useCallback, useMemo, useState } from 'react';

import { createEditor, Editor, Transforms } from 'slate';

import { withReact, Editable, Slate } from 'slate-react';
import { withHistory                } from 'slate-history';

import Element from './editor/element';
import Leaf    from './editor/leaf';

import Grid from './control/Grid';

import '../scss/editor.css'

import data    from './editor/_data';
import Toolbar from './editor/_toolbar';

import constant from './editor/constant';



function layout(editor)
{
  const { normalizeNode } = editor

  editor.normalizeNode = (entry) =>
  {
    console.log(entry);

    // const [node, path] = entry;

    return normalizeNode(entry)
  }

  return editor
}





function XEditor()
{
  const [value, SetValue] = useState(data);

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  constant(editor);

  layout(editor);

  const style =
    {
      minWidth: '210mm',
      maxWidth: '210mm',

      minHeight: '297mm',
      maxHeight: '297mm',

      backgroundColor: '#ffffff'
    };

  const element =

    <Slate editor={ editor } value={ value } onChange={value => SetValue(value)}>
      <Grid.Row layout='mt-3'>
        <Grid.Column>
          <Toolbar/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row layout='mt-3 p-3' color='secondary'>
        <
          div
          className='col'
          style={ style }
        >
          <div>
            <
              Editable
              renderElement = { useCallback(props => <Element { ...props } />, []) }
              renderLeaf    = { useCallback(props => <Leaf    { ...props } />, []) }
              autoFocus
            />
          </div>
        </div>
      </Grid.Row>
    </Slate>
  ;

  return element;
}


export default XEditor;

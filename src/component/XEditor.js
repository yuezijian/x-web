import React, { useCallback, useMemo, useState } from 'react';

import { createEditor } from 'slate';

import { withReact, Editable, Slate } from 'slate-react';
import { withHistory                } from 'slate-history';

import Element from './editor/element';
import Leaf    from './editor/leaf';

import Grid from './layout/Grid';

import '../scss/editor.css'

import data    from './editor/_data';
import Toolbar from './editor/_toolbar';


function XEditor()
{
  const [value, SetValue] = useState(data);

  const editor = useMemo(() => withHistory(withReact(createEditor())), []);

  const element =

    <Grid.Row className='mt-3'>
      <div className='col auto'>
        <Slate editor={ editor } value={ value } onChange={value => SetValue(value)}>
          <Toolbar/>
          <div className='mt-2 py-3 bg-secondary'>
            <div className='paper-a4'>
              <
                Editable
                renderElement = { useCallback(props => <Element { ...props } />, []) }
                renderLeaf    = { useCallback(props => <Leaf    { ...props } />, []) }
                placeholder   = 'Enter some rich text…'
                spellCheck
                autoFocus
              />
            </div>
          </div>
        </Slate>
      </div>
    </Grid.Row>
  ;

  return element;
}


export default XEditor;

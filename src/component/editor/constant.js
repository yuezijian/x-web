import { Editor } from 'slate';


function constant(editor)
{
  const
    {
      deleteBackward,
      deleteForward,
      deleteFragment,

      insertBreak,
      insertFragment,
      insertNode,
      insertText,

      insertData
    } = editor;

  const intercept = (callback) =>
  {
    const [constant] = Editor.nodes(editor, { match: n => n.type === 'constant' });

    if (!constant)
    {
      callback();
    }
  }

  editor.insertBreak    = ()       => intercept(() => insertBreak());
  editor.insertData     = data     => intercept(() => insertData(data));
  editor.insertFragment = fragment => intercept(() => insertFragment(fragment));
  editor.insertText     = string   => intercept(() => insertText(string));
  editor.insertNode     = node     => intercept(() => insertNode(node));

  editor.deleteBackward = unit => intercept(() => deleteBackward(unit));
  editor.deleteForward  = unit => intercept(() => deleteForward(unit));

  editor.deleteFragment = () =>
  {
    const fragment = editor.getFragment();

    if (!fragment.find(n => n.type === 'constant'))
    {
      deleteFragment();
    }
  };
}


export default constant;

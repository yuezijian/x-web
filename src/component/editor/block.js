import { Editor, Transforms } from 'slate';


const LIST_TYPES = ['ol', 'ul']


const Block = {};

Block.is_active = function (editor, format)
{
  const options =
    {
      match: n => n.type === format,
    };

  const [match] = Editor.nodes(editor, options);

  return !!match
};

Block.toggle = function (editor, format)
{
  const active = Block.is_active(editor, format);

  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: active ? 'paragraph' : isList ? 'li' : format,
  })

  if (!active && isList)
  {
    const block = { type: format, children: [] };

    Transforms.wrapNodes(editor, block)
  }
};


export default Block;

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

  const isList = LIST_TYPES.includes(format);

  {
    const options =
      {
        match: n =>
        {
          console.log(n);

          return LIST_TYPES.includes(n.type);
        },

        split: true
      };

    Transforms.unwrapNodes(editor, options);
  }
  {
    const options =
      {
        type: active ? 'p' : isList ? 'li' : format
      };

    Transforms.setNodes(editor, options);
  }

  if (!active && isList)
  {
    Transforms.wrapNodes(editor, { type: format, children: [] })
  }
};


export default Block;

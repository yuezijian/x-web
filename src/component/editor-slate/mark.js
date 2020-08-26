import { Editor } from 'slate';


const Mark = {};

Mark.is_active = function (editor, format)
{
  const marks = Editor.marks(editor);

  return marks ? marks[format] === true : false;
};

Mark.toggle = function (editor, format)
{
  const active = Mark.is_active(editor, format)

  if (active)
  {
    Editor.removeMark(editor, format)
  }
  else
  {
    Editor.addMark(editor, format, true)
  }
};


export default Mark;

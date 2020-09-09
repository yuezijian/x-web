class InputAdapter
{
  constructor(editor)
  {
    this.ime = false;

    this.editor = editor;
  }

  key_down(event)
  {
    if (event.code === 'ArrowLeft')
    {
      if (!this.ime)
      {
        this.editor.caret_move_left();
      }

      return;
    }

    if (event.code === 'ArrowRight')
    {
      if (!this.ime)
      {
        this.editor.caret_move_right();
      }

      return;
    }

    if (event.code === 'Enter')
    {
      if (!this.ime)
      {
        this.editor.insert('\n');
      }
    }
  }

  key_up(event)
  {
  }

  input(event)
  {
    if (!this.ime)
    {
      if (event.inputType === 'insertText')
      {
        this.editor.insert(event.data);
      }
    }
  }

  paste(event)
  {
    const text = event.clipboardData.getData('text');

    this.editor.insert(text);
  }

  change(event)
  {
  }

  composition_start(event)
  {
    this.ime = true;
  }

  composition_update(event)
  {
  }

  composition_end(event)
  {
    this.ime = false;

    this.editor.insert(event.data);
  }
}


export default InputAdapter;

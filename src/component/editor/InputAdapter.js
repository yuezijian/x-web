class InputAdapter
{
  constructor(editor)
  {
    this.shift = false;

    this.ime = false;

    this.editor = editor;
  }

  key_down(event)
  {
    const key = event.key;

    if (key === 'Shift')
    {
      this.shift = true;
    }

    if (key === 'ArrowLeft')
    {
      if (!this.ime)
      {
        this.editor.caret_move_left(this.shift);
      }

      return;
    }

    if (key === 'ArrowRight')
    {
      if (!this.ime)
      {
        this.editor.caret_move_right(this.shift);
      }

      return;
    }

    if (key === 'Enter')
    {
      if (!this.ime)
      {
        this.editor.insert('\n');
      }
    }
  }

  key_up(event)
  {
    const key = event.key;

    if (key === 'Shift')
    {
      this.shift = false;
    }
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

  mouse_down(event)
  {
    this.editor.caret_jump(event.offsetX * 2, event.offsetY * 2);
  }
}


export default InputAdapter;

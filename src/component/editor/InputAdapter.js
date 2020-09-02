class InputAdapter
{
  constructor(editor)
  {
    this.ime = false;

    this.editor = editor;
  }

  input(event)
  {
    if (this.ime)
    {
    }
    else
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

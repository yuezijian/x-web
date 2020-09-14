class Caret
{
  constructor(object)
  {
    this._object = object;

    this._state =
      {
        select: false
      };

    this._selection = { anchor: 0, focus: 0 };
  }

  backward(steps)
  {
    const anchor = this._selection.anchor;
    const focus  = this._selection.focus;

    const position = anchor < focus ? anchor : focus;

    if (position <= this._selection.anchor)
    {
      this._selection.anchor -= steps;

      if (this._selection.anchor < 0)
      {
        this._selection.anchor = 0;
      }

      this._selection.focus = this._selection.anchor;
    }
  }

  forward(steps)
  {
    const anchor = this._selection.anchor;
    const focus  = this._selection.focus;

    const position = anchor < focus ? focus : anchor;

    if (position < this._object.length())
    {
      this._selection.anchor += steps;

      if (this._selection.anchor > this._object.length())
      {
        this._selection.anchor = this._object.length();
      }

      this._selection.focus = this._selection.anchor;
    }
  }

  move_to(position)
  {
    this._selection.anchor = position;
    this._selection.focus  = position;
  }

  selection()
  {
    return { anchor: this._selection.anchor, focus: this._selection.focus };
  }
}


export default Caret;

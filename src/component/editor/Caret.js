class Caret
{
  constructor(object)
  {
    this._object = object;

    this._selection = { anchor: 0, focus: 0 };
  }

  jump(renderer, x, hold_anchor)
  {
    const property = this._object.get();

    const n = this._object.length();

    let i = 0;
    let d = property.x;
    let w = 0;

    while (i < n && d < x)
    {
      const c = this._object.value()[i];

      w = renderer.measure(property.font, c);

      i += 1;
      d += w;
    }

    if (d - x > w * 0.5)
    {
      i -= 1;
    }

    this.to({ anchor: hold_anchor ? this._selection.anchor : i, focus: i });
  }

  selection()
  {
    return { anchor: this._selection.anchor, focus: this._selection.focus };
  }

  range()
  {
    const { anchor, focus } = this._selection;

    let begin = anchor < focus ? anchor : focus;
    let end   = anchor < focus ? focus  : anchor;

    return { begin, end };
  }

  to({ anchor, focus })
  {
    this._selection.anchor = anchor;
    this._selection.focus  = focus;
  }

  to_left(steps, hold_anchor)
  {
    const { anchor, focus } = this._selection;

    if (hold_anchor)
    {
      let i = focus - steps;

      if (i < 0)
      {
        i = 0;
      }

      this.to({ anchor, focus: i });
    }
    else
    {
      if (anchor !== focus)
      {
        const position = anchor < focus ? anchor : focus

        this.to({ anchor: position, focus: position });
      }
      else
      {
        let i = focus - steps;

        if (i < 0)
        {
          i = 0;
        }

        this.to({ anchor: i, focus: i });
      }
    }
  }

  to_right(steps, hold_anchor)
  {
    const { anchor, focus } = this._selection;

    if (hold_anchor)
    {
      let i = focus + steps;

      if (i > this._object.length())
      {
        i = this._object.length();
      }

      this.to({ anchor, focus: i });
    }
    else
    {
      if (anchor !== focus)
      {
        const position = anchor < focus ? focus : anchor

        this.to({ anchor: position, focus: position });
      }
      else
      {
        let i = focus + steps;

        if (i > this._object.length())
        {
          i = this._object.length();
        }

        this.to({ anchor: i, focus: i });
      }
    }
  }

  draw(renderer)
  {
    const property = this._object.get();

    let n = this._selection.focus;
    let w = 0;

    for (let i = 0; i < n; ++i)
    {
      const c = this._object.value()[i];

      w += renderer.measure(property.font, c);
    }

    const x = property.x + w;
    const y = property.baseline - property.font.height + 4;

    const width  = 3;
    const height = property.font.height;

    renderer.draw_rectangle({ x, y, width, height }, '#000000');
  }
}


export default Caret;

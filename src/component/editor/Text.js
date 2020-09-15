class Text
{
  constructor()
  {
    this._value = '';

    this._x        = 0;
    this._baseline = 0;
    this._width    = 0;

    this._font = { height: 0 };

    this._color = '#000000'
  }

  value()
  {
    return this._value;
  }

  set({ x, baseline, font, color })
  {
    if (x)
    {
      this._x = x;
    }

    if (baseline)
    {
      this._baseline = baseline;
    }

    if (font)
    {
      this._font = font;
    }

    if (color)
    {
      this._color = color;
    }
  }

  get()
  {
    const object =
      {
        x:        this._x,
        baseline: this._baseline,
        font:     this._font,
        color:    this._color
      };

    return object;
  }

  length()
  {
    return this._value.length;
  }

  mutate(begin, end, text)
  {
    if (begin === end)
    {
      const offset = begin;

      if (this._value.length === offset)
      {
        this._value += text;
      }
      else
      {
        this._value = this._value.substring(0, offset) + text + this._value.substring(offset);
      }
    }
    else
    {
      this._value = this._value.substring(begin, end) + text + this._value.substring(end);
    }
  }

  draw(renderer)
  {
    renderer.draw_text(this._font, this._value, this._x, this._baseline, this._color);
  }
}


export default Text;

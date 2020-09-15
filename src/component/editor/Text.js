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

  mutate(selection, text)
  {
    const { begin, end } = selection;

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
      this._value = this._value.substring(0, begin) + text + this._value.substring(end);
    }
  }

  draw(renderer, selection)
  {
    renderer.draw_text(this._font, this._value, this._x, this._baseline, this._color);

    if (selection)
    {
      const { begin, end } = selection;

      if (begin !== end)
      {
        renderer.draw_text(this._font, this._value, this._x, this._baseline, this._color);

        let x = this._x;

        for (let i = 0; i < begin; ++i)
        {
          x += renderer.measure(this._font, this._value[i]);
        }

        let width = 0;

        for (let i = begin; i < end; ++i)
        {
          width += renderer.measure(this._font, this._value[i]);
        }

        const y = this._baseline - this._font.height + 4;

        const height = this._font.height;

        renderer.draw_rectangle({ x, y, width, height }, '#286fff');

        renderer.draw_text(this._font, this._value.substring(begin, end), x, this._baseline, '#ffffff');
      }
    }
  }
}


export default Text;

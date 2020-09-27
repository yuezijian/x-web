class Segment
{
  constructor()
  {
    this._x        = 0;
    this._baseline = 0;

    this._value = '';
  }

  value()
  {
    return this._value;
  }

  length()
  {
    return this._value.length;
  }

  slice(range)
  {
    const { begin, end } = range;

    return this._value.substring(begin, end);
  }

  mutate(range, text)
  {
    const { begin, end } = range;

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

  exceed(renderer, bounding, font)
  {
    let width = 0;

    for (let i = 0; i < this._value.length; ++i)
    {
      width += renderer.measure(font, this._value[i]);

      if (bounding.left + width > bounding.right)
      {
        const text = this._value.substring(i);

        this._value = this._value.substring(0, i);

        return text;
      }
    }
  }

  set({ x, baseline })
  {
    if (x)
    {
      this._x = x;
    }

    if (baseline)
    {
      this._baseline = baseline;
    }
  }

  get()
  {
    const x        = this._x;
    const baseline = this._baseline;

    return { x, baseline };
  }

  character_x(renderer, font, offset)
  {
    let width = 0;

    for (let i = 0; i < offset; ++i)
    {
      width += renderer.measure(font, this._value[i]);
    }

    return { x: this._x + width, baseline: this._baseline };
  }

  character_offset(renderer, font, x)
  {
    if (x < this._x)
    {
      return 0;
    }

    if (x > this._x + renderer.measure(font, this._value))
    {
      return this._value.length - 1;
    }

    let index    = 0;
    let position = 0;

    for (let i = 0; i < this._value.length; ++i)
    {
      const width = renderer.measure(font, this._value[i]);

      if (this._x + position - width * 0.5 > x)
      {
        break;
      }

      index     = i;
      position += width;
    }

    return index;
  }

  draw(renderer, color, font, selection)
  {
    renderer.draw_text(font, this._value, this._x, this._baseline, color);

    if (selection)
    {
      const { begin, end } = selection;

      if (begin !== end)
      {
        let x = this._x;

        for (let i = 0; i < begin; ++i)
        {
          x += renderer.measure(font, this._value[i]);
        }

        let width = 0;

        for (let i = begin; i < end; ++i)
        {
          width += renderer.measure(font, this._value[i]);
        }

        const y = this._baseline - font.height + 4;

        const height = font.height;

        renderer.draw_rectangle({ x, y, width, height }, '#286fff');

        renderer.draw_text(font, this._value.substring(begin, end), x, this._baseline, '#ffffff');
      }
    }
  }
}


export default Segment;

import Location from "./Location";

import Segment from './Segment';


// todo 需要计算首行 baseline

class Text
{
  constructor()
  {
    this._color = '#000000';

    this._font =
      {
        family: '',
        height: 0
      };

    this._bounding =
      {
        left:   0,
        top:    0,
        right:  0,
        bottom: 0
      };

    this._selection =
      {
        anchor: 0,
        focus:  0
      };

    this._segments = [new Segment()];  // 至少存在一段
  }

  set({ bounding, color, font })
  {
    if (bounding)
    {
      this._bounding.left  = bounding.left;
      this._bounding.right = bounding.right;
      this._bounding.top   = bounding.top;
    }

    if (color)
    {
      this._color = color;
    }

    if (font)
    {
      this._font = font;
    }

    let baseline = this._bounding.top + this._font.height;

    this._segments[0].set({ baseline });

    for (let i = 1; i < this._segments.length; ++i)
    {
      baseline += this._font.height * 1.5;

      const segment = this._segments[i];

      segment.set({ baseline });
    }

    this._bounding.bottom = baseline;
  }

  get()
  {
    const property =
      {
        bounding: this._bounding,
        color:    this._color,
        font:     this._font
      };

    return property;
  }

  length()
  {
    return this._segments.reduce((a, c) => a + c.length(), 0);
  }

  mutate(renderer, { begin, end }, text)
  {
    if (Location.compare(begin, end) !== 0)
    {
      if (begin.path() === end.path())
      {
        const o_begin = this._segments[begin.path()    ];
        const o_end   = this._segments[begin.path() + 1];

        o_begin.mutate({ begin: begin.offset(), end: end.offset() }, '');

        if (o_end !== undefined)
        {
          o_begin.mutate({ begin: o_begin.length(), end: o_begin.length() }, o_end.value());

          this._segments.splice(begin.path() + 1, 1);
        }
      }
      else
      {
        const o_begin = this._segments[begin.path()];
        const o_end   = this._segments[  end.path()];

        const tt = o_end.slice({ begin: end.offset(), end: o_end.length() });

        o_begin.mutate({ begin: begin.offset(), end: o_begin.length() }, tt);

        this._segments.splice(begin.path() + 1, end.path() - begin.path());
      }
    }

    const location = begin;

    let index = location.path();

    let segment = this._segments[index];

    const offset = location.offset();

    segment.mutate({ begin: offset, end: offset }, text);

    while (segment !== undefined)
    {
      const exceed = segment.exceed(renderer, this._bounding, this._font);

      if (exceed === undefined)
      {
        break;
      }

      const baseline = segment.get().baseline + this._font.height * 1.5;

      if (index + 1 === this._segments.length)
      {
        const seg = new Segment();

        seg.mutate({ begin: 0, end: 0 }, exceed);
        seg.set({ x: this._bounding.left, baseline });

        this._segments.push(seg);

        this._bounding.bottom = baseline;
      }
      else
      {
        segment = this._segments[index + 1];

        segment.mutate({ begin: 0, end: 0 }, exceed);
        segment.set({ baseline });
      }

      index += 1;

      segment = this._segments[index];
    }
  }

  locate(x, y)
  {
    let index = 0;

    if (y <= this._bounding.top)
    {
      index = 0;
    }
    else if (y >= this._bounding.bottom)
    {
      index = this._segments.length - 1;
    }
    else
    {
      let delta = this._bounding.bottom - this._bounding.top;

      for (let i = 0; i < this._segments.length; i++)
      {
        const segment = this._segments[i];

        const midline = segment.get().baseline + this._font.height * 0.5

        const d = Math.abs(y - midline);

        if (d < delta)
        {
          index = i;
          delta = d;
        }
      }
    }

    // segment 判断在哪一个 offset 上
    // x
    ;

    return Location.create(index, 10);
  }

  location_backward(location, steps)
  {
    let index  = location.path();
    let offset = location.offset();

    let object = this._segments[index];

    while (true)
    {
      if (steps < offset)
      {
        offset -= steps;

        return Location.create(index, offset);
      }

      if (index - 1 < 0)
      {
        return Location.create(0, 0);
      }

      index -= 1;

      steps -= offset;

      object = this._segments[index];

      offset = object.length();
    }
  }

  location_forward(location, steps)
  {
    let index  = location.path();
    let offset = location.offset();

    let object = this._segments[index];

    while (true)
    {
      if (offset + steps <= object.length())
      {
        offset += steps;

        return Location.create(index, offset);
      }

      if (index + 1 >= this._segments.length)
      {
        return Location.create(index, object.length());
      }

      index += 1;

      steps -= object.length() - offset;

      object = this._segments[index];

      offset = 0;
    }
  }

  draw(renderer)
  {
    // todo 根据 _selection 成员计算 segment 的选择

    for (const segment of this._segments)
    {
      segment.draw(renderer, this._color, this._font);
    }
  }

  info(renderer, location)
  {
    const segment = this._segments[location.path()];

    return segment.info(renderer, this._font, location.offset());
  }
}


export default Text;

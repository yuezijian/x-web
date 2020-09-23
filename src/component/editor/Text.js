import Location from "./Location";

import Segment from './Segment';


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
      this._bounding = bounding;
    }

    if (color)
    {
      this._color = color;
    }

    if (font)
    {
      this._font = font;
    }
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

    let object = this._segments[index];

    const offset = location.offset();

    object.mutate({ begin: offset, end: offset }, text);

    while (object !== undefined)
    {
      const exceed = object.exceed(renderer, this._bounding, this._font);

      if (exceed === undefined)
      {
        break;
      }

      if (index + 1 === this._segments.length)
      {
        const segment = new Segment();

        segment.mutate({ begin: 0, end: 0 }, exceed);

        this._segments.push(segment);
      }
      else
      {
        object = this._segments[index + 1];

        object.mutate({ begin: 0, end: 0 }, exceed);
      }

      index += 1;

      object = this._segments[index];
    }
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

    let baseline = this._font.height;

    for (const segment of this._segments)
    {
      const x = this._bounding.left;

      segment.set({ x, baseline: this._bounding.top + baseline });

      segment.draw(renderer, this._color, this._font);

      baseline += this._font.height * 1.5;
    }
  }

  info(renderer, location)
  {
    const segment = this._segments[location.path()];

    return segment.info(renderer, this._font, location.offset());
  }
}


export default Text;

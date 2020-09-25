import Location from './Location';


class Caret
{
  constructor(document)
  {
    this._document = document;

    this._selection =
      {
        anchor: new Location(),
        focus:  new Location()
      };
  }

  selection()
  {
    const anchor = Location.clone(this._selection.anchor);
    const focus  = Location.clone(this._selection.focus );

    return { anchor, focus };
  }

  range()
  {
    const { anchor, focus } = this._selection;

    let b = Location.compare(anchor, focus) < 0 ? anchor : focus ;
    let e = Location.compare(anchor, focus) < 0 ? focus  : anchor;

    return { begin: Location.clone(b), end: Location.clone(e) };
  }

  select({ anchor, focus })
  {
    this._selection.anchor.assign(anchor);
    this._selection.focus.assign(focus);
  }

  to(location)
  {
    this.select({ anchor: location, focus: location });
  }

  backward(steps, hold_anchor)
  {
    const { anchor, focus } = this._selection;

    if (hold_anchor)
    {
      const location = this._document.location_backward(focus, steps);

      this.select({ anchor, focus: location });
    }
    else
    {
      const comparison = Location.compare(anchor, focus);

      if (comparison !== 0)
      {
        const location = comparison < 0 ? anchor : focus

        this.to(location);
      }
      else
      {
        const location = this._document.location_backward(focus, steps);

        this.to(location);
      }
    }
  }

  forward(steps, hold_anchor)
  {
    const { anchor, focus } = this._selection;

    if (hold_anchor)
    {
      const location = this._document.location_forward(focus, steps);

      this.select({ anchor, focus: location });
    }
    else
    {
      const comparison = Location.compare(anchor, focus);

      if (comparison !== 0)
      {
        const location = comparison < 0 ? focus : anchor

        this.to(location);
      }
      else
      {
        const location = this._document.location_forward(focus, steps);

        this.to(location);
      }
    }
  }

  jump(renderer, x, y, hold_anchor)
  {
    const lo = this._document._children[0].locate(x, y);

    this.to(lo);

    // todo 这里的鼠标选择需要跨行了
    // 根据鼠标起始位置，和移动，直接进行光标的 forward 或者 backward

    return;

    // 首先，点击在哪一行

    // 获得那一行，判断点在啥位置，计算出来

    const property = this._document.get();

    const n = this._document.length();

    let i = 0;
    let d = property.x;
    let w = 0;

    while (i < n && d < x)
    {
      const c = this._document.value()[i];

      w = renderer.measure(property.font, c);

      i += 1;
      d += w;
    }

    if (d - x > w * 0.5)
    {
      i -= 1;
    }

    if (hold_anchor)
    {
      this.select({ anchor: this._selection.anchor, focus: i });
    }
    else
    {
      this.to(i);
    }
  }

  draw(renderer)
  {
    const focus = this._selection.focus;

    // todo 实现这里
    //
    // 这里的 context 将包含一切信息
    //
    // const context = this._document.context(focus);

    const object = this._document.child(0);

    const property = object.get();

    const info = object.info(renderer, focus);

    const x = info.x;
    const y = info.baseline - property.font.height + 4;

    const width  = 3;
    const height = property.font.height + 2;

    renderer.draw_rectangle({ x, y, width, height }, '#000000');
  }
}


export default Caret;

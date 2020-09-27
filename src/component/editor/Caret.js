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

    this._document.select(this._selection);
  }

  set(location)
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

        this.set(location);
      }
      else
      {
        const location = this._document.location_backward(focus, steps);

        this.set(location);
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

        this.set(location);
      }
      else
      {
        const location = this._document.location_forward(focus, steps);

        this.set(location);
      }
    }
  }

  to(renderer, x, y, hold_anchor)
  {
    const location = this._document._children[0].locate(renderer, x, y);

    if (hold_anchor)
    {
      this.select({ anchor: this._selection.anchor, focus: location });
    }
    else
    {
      this.set(location);
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

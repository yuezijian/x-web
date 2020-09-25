import Caret    from './Caret';
import Document from './Document';
import Location from './Location';
import Renderer from './Renderer';


class Editor
{
  constructor()
  {
    console.log('Editor constructor');

    this.background = '#ececec';

    this.renderer = null;

    this.size = null;

    this.document = null;
  }

  attach(canvas)
  {
    canvas.style.cursor = 'text';

    this.size = { width: canvas.width, height: canvas.height };

    this.renderer = new Renderer(canvas);

    this.renderer.clear(this.background, this.size);

    this.document = new Document();

    this.caret = new Caret(this.document);
  }

  render()
  {
    this.renderer.clear(this.background, this.size);

    this.document.draw(this.renderer);

    this.caret.draw(this.renderer);
  }

  insert(text)
  {
    const range = this.caret.range();

    this.document.mutate(this.renderer, range, text);

    this.caret.forward(text.length);

    this.render();
  }

  delete_backward()
  {
    let { begin, end } = this.caret.range();

    if (Location.compare(begin, end) === 0)
    {
      begin = this.document.location_backward(begin, 1);
    }

    this.document.mutate(this.renderer, { begin, end }, '');

    this.caret.to(begin);

    this.render();
  }

  delete_forward()
  {
    const range = this.caret.range();

    if (range.begin === range.end)
    {
      range.end += 1;

      if (range.end > this.document.length())
      {
        range.end = this.document.length();
      }
    }

    this.document.mutate(this.renderer, range, '');

    const position = range.begin;

    this.caret.to(position);

    this.render();
  }

  caret_move_left(hold_anchor)
  {
    this.caret.backward(1, hold_anchor);

    this.render();
  }

  caret_move_right(hold_anchor)
  {
    this.caret.forward(1, hold_anchor);

    this.render();
  }

  caret_jump(x, y, hold_anchor)
  {
    this.caret.jump(this.renderer, x, y, hold_anchor);

    this.render();
  }
}


export default Editor;

/*
 *
 *  最小文本单元，格式单一，不存在换行
 *
 *  在不同的行位置，使用多个文本单元，表达换行行为
 *
 *
 *  X 起始位置由自身的边界侧边决定，取决于是左对齐还是右对齐
 *
 *  Y 位置由所在行的基线决定
 *
 *
 *    text.bounding.left()
 *    text.bounding.right()
 *
 *    text.bounding.width()
 *
 *
 *  与 context.bounding 进行计算，可能因越界进行分割，产生新的对象
 *
 *  光标访问
 *  插入新的内容
 *
 *
 */

// splice(start, count, text)
// {
//   this.value = this.value.substring(0, start) + text + this.value.substring(start + count);
// }

import Caret from './Caret';



class Text
{
  constructor()
  {
    this._value = '';

    this._x        = 0;
    this._baseline = 0;
    this._width    = 0;

    this._font = { height: 0 };

    this._caret = new Caret(this);

    this._selection =
      {
        anchor: 0,
        focus:  0
      }
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

  length()
  {
    return this._value.length;
  }

  insert(text)
  {
    const selection = this._caret.selection();

    if (selection.anchor === selection.focus)
    {
      const offset = selection.anchor;

      if (this._value.length === offset)
      {
        this._value += text;
      }
      else
      {
        this._value = this._value.substring(0, offset) + text + this._value.substring(offset);
      }

      this._caret.forward(text.length);
    }
    else
    {
      const anchor = this._selection.anchor;
      const focus  = this._selection.focus;

      let start = anchor < focus ? anchor : focus;
      let stop  = anchor < focus ? focus  : anchor;

      this._value = this._value.substring(start, stop) + text + this._value.substring(stop);

      this._caret.move_to(start + text.length);
    }
  }

  caret()
  {
    // const x        = this._x;
    // const baseline = this._baseline;

    return this._caret;
  }

  draw(renderer)
  {
    renderer.draw_text(this._font, this._value, this._x, this._baseline, this._color);
  }
}


export default Text;


// 刚刚抽象好光标的几个基础行为，还未测试

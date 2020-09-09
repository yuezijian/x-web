class Context
{
  constructor()
  {
    this.font = {};
    this.bounding = {};
    this.caret = {};
  }

  reset(size)  // 临时传入 size
  {
    this.font.family = '';
    this.font.height = 32;

    this.bounding.left   = 40;
    this.bounding.right  = size.width - 40;
    this.bounding.top    = 40;
    this.bounding.bottom = size.height - 40;

    this.caret.path = [ 0, 0 ];

    this.caret.x        = this.bounding.left;
    this.caret.baseline = this.bounding.top + this.font.height;
  }

  is_overstep(width)
  {
    // 未来会加入方向判定

    return this.caret.x + width <= this.bounding.right;
  }

  break_line()
  {
    this.caret.path[0] += 1;
    this.caret.path[1]  = 0;

    this.caret.x         = this.bounding.left;
    this.caret.baseline += this.font.height * 1.5;
  }

  caret_move(width)
  {
    this.caret.x += width;
  }
}


export default Context;

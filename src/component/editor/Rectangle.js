class Rectangle
{
  constructor(left, right, top, bottom)
  {
    this.left   = left;
    this.right  = right;
    this.top    = top;
    this.bottom = bottom;
  }

  x()
  {
    return this.left;
  }

  y()
  {
    return this.top;
  }

  width()
  {
    return this.right - this.left;
  }

  height()
  {
    return this.bottom - this.top;
  }

  extend_right(value)
  {
    this.right += value;
  }

  contain_horizontal(y)
  {
    return this.top  <= y && y <= this.bottom;
  }

  contain_vertical(x)
  {
    return this.left <= x && x <= this.right;
  }

  contain(x, y)
  {
    return this.contain_horizontal(y) && this.contain_vertical(x);
  }
}


export default Rectangle;

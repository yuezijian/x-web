class Renderer
{
  constructor(canvas)
  {
    this.device = canvas.getContext('2d');

    this.device.font         = '32px courier';
    this.device.textBaseline = 'bottom';

    // this.device.scale(8, 8);
  }

  clear(color, { width, height })
  {
    this.device.fillStyle = color;

    this.device.clearRect(0, 0, width, height)
    this.device.fillRect(0, 0, width, height);
  }

  draw_rectangle(rectangle, color)
  {
    const x      = rectangle.x();
    const y      = rectangle.y();
    const width  = rectangle.width();
    const height = rectangle.height();

    this.device.fillStyle = color;

    this.device.fillRect(x, y, width, height);
  }

  draw_text(text, x, baseline, color)
  {
    this.device.fillStyle = color;

    this.device.fillText(text, x, baseline);
  }

  measure(text)
  {
    return this.device.measureText(text).width;
  }
}


export default Renderer;

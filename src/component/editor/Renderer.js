class Renderer
{
  constructor(canvas)
  {
    this.device = canvas.getContext('2d');

    // this.device.textBaseline = 'bottom';
  }

  clear(color, { width, height })
  {
    this.device.fillStyle = color;

    this.device.clearRect(0, 0, width, height)
    this.device.fillRect(0, 0, width, height);
  }

  draw_rectangle({ x, y, width, height }, color)
  {
    this.device.fillStyle = color;

    this.device.fillRect(x, y, width, height);
  }

  draw_text(font, text, x, baseline, color)
  {
    this.device.fillStyle = color;

    this.device.font = `${ font.height }px ${ font.family}`;

    this.device.fillText(text, x, baseline);
  }

  measure(font, text)
  {
    this.device.font = `${ font.height }px ${ font.family}`;

    return this.device.measureText(text).width;
  }
}


export default Renderer;

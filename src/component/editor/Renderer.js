// const text =
//   {
//     align:
//       {
//         start: 'start',  // 默认值
//         end:   'end',
//
//         left:   'left',
//         right:  'right',
//         center: 'center',
//       },
//
//     baseline:
//       {
//         alphabetic:  'alphabetic',  // 默认值
//         hanging:     'hanging',
//         ideographic: 'ideographic',
//
//         top:    'top',
//         middle: 'middle',
//         bottom: 'bottom'
//       }
//   };


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

    // {
    //   this.device.strokeStyle = '#ff0000';
    //
    //   const width = this.device.measureText(text).width;
    //
    //   this.device.strokeRect(x, baseline - font.height, width, font.height);
    // }
  }

  measure(font, text)
  {
    this.device.font = `${ font.height }px ${ font.family}`;

    return this.device.measureText(text).width;
  }
}


export default Renderer;

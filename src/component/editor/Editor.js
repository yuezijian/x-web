import Rectangle from './Rectangle';
import Renderer  from './Renderer';


function bounding_by_context(context)
{
  const left   = context.left;
  const right  = context.left;
  const top    = context.baseline - context.font.height;
  const bottom = context.baseline;

  return new Rectangle(left, right, top, bottom);
}

function context_can_expand(context, width)
{
  // 未来会加入方向判定

  // console.log(context.x, width, context.right);

  return context.x + width <= context.right;
}

function context_new_line(context)
{
  context.x = context.left;
  context.baseline += context.font.height * 1.5;
}

function context_move(context, width)
{
  context.x += width;
}


class Editor
{
  constructor()
  {
    console.log('Editor constructor');

    this.renderer = null;

    this.size = null;

    // 这是原始文本（未来会是原始节点）
    this.buffer = '这是一个测试这是一个测试这是一个测试这是一个测试这是一个测试';
    // this.buffer = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz';

    // 原始文本通过计算会形成绘制用数据结构

    // 目前的结构会比较简单，有一个边界，有若干文本（，有相关字体信息）

    this.bounding_rows = null;
  }

  attach(canvas)
  {
    this.size = { width: canvas.width, height: canvas.height };

    this.left  = 0;
    this.right = this.size.width;

    this.renderer = new Renderer(canvas);

    this.render();  // 完成第一次渲染
  }

  render()
  {
    this.renderer.clear('#eeeeee', this.size);  // canvas 是一个增量绘制，所以这一行的逻辑未来应该不需要

    this.row = 0;  // 这两者包含了光标位置概念

    this.context =
      {
        font:
          {
            family: '',

            height: 20
          },

        left:  0,
        right: this.size.width,

        x: 0
      };

    this.context.baseline = this.context.font.height;

    this.primitives =
      [
        // 至少存在第一行对象
        {
          text:     '',
          bounding: bounding_by_context(this.context)
        }
      ];

    // 纯计算步骤
    //
    // 逐字符测量宽度，得到边界，和相关文本，组成一个小图元对象，加入容器

    for (const character of this.buffer)
    {
      const width = this.renderer.measure(character);

      if (!context_can_expand(this.context, width))
      {
        // 首先切换到下一行
        context_new_line(this.context);

        // 产生新的边界
        const bounding = bounding_by_context(this.context);

        this.primitives.push({ text: '', bounding });

        // 当前光标位置改变
        this.row += 1;
      }

      // 添加新文本
      this.primitives[this.row].text += character;

      // 扩展当前边界
      this.primitives[this.row].bounding.extend_right(width);

      // 新的光标位置
      context_move(this.context, width);
    }

    // 设置 viewport 等
    //
    // 移动（滚动），缩放

    // 绘制所有的内容

    for (const object of this.primitives)
    {
      this.renderer.draw_rectangle(object.bounding, '#acacac');
      this.renderer.draw_text(object.text, object.bounding.x(), object.bounding.bottom, '#000000');
    }
  }

  insert(text)
  {
    // 根据当前状态，直接绘制变化量

    this.buffer += text;

    this.render();  // 而不是全部渲染
  }
}


export default Editor;

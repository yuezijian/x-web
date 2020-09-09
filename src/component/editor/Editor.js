import Rectangle from './Rectangle';
import Renderer  from './Renderer';
import Context from "./Context";


function string_insert(string, position, value)
{
  return string.substring(0, position) + value + string.substring(position);
}

function bounding_by_context(context)
{
  const left   = context.bounding.left;
  const right  = context.bounding.left;
  const top    = context.caret.baseline - context.font.height;
  const bottom = context.caret.baseline;

  return new Rectangle(left, right, top, bottom);
}

function caret_rectangle_by_context(context, rectangle)
{
  rectangle.left   = context.caret.x;
  rectangle.right  = context.caret.x + 2;
  rectangle.top    = context.caret.baseline - context.font.height - 2;
  rectangle.bottom = context.caret.baseline - 2;
}

function caret_draw(context, renderer, rectangle)
{
  // 计算光标位置
  caret_rectangle_by_context(context, rectangle);

  // 绘制光标
  renderer.draw_rectangle(rectangle, '#000000');
}


function document_get_object(document, context)
{
  return document[context.caret.path[0]];
}

function document_object_backward(document, context)
{
  const n = context.caret.path[0] - 1;

  const object = document[n];

  context.caret.path[0] = n;
  context.caret.path[1] = object.text.length;

  context.caret.x        = object.bounding.right;  // 后期加入方向
  context.caret.baseline = object.baseline;
}

function document_object_forward(document, context)
{
  const n = context.caret.path[0] + 1;

  const object = document[n];

  context.caret.path[0] = n;
  context.caret.path[1] = 0;

  context.caret.x        = object.bounding.left;  // 后期加入方向
  context.caret.baseline = object.baseline;
}

// function document_object_backward_jump_break(document, context)
// {
//   const object = document[context.caret.path[0]];
//
//   if (object.text[object.text.length - 1] === '\n')
//   {
//     context.caret.path[1] -= 1;
//   }
// }

// function document_object_forward_jump_break(document, context)
// {
//   const object = document[context.caret.path[0]];
//
//   if (object.text[context.caret.path[1] + 1] === '\n')
//   {
//     context.caret.path[1] += 1;
//   }
// }


function document_insert_break(context, document)
{
  const object = document[context.caret.path[0]];

  // 使用 context.caret.path[1] 进行 insert

  // 目前只是简单追加
  // object.text += '\n';

  object.newline = true;

  // context.caret.path[1] += 1;
}

function document_add_object(context, document)
{
  const object =
    {
      text:     '',
      baseline: context.caret.baseline,
      bounding: bounding_by_context(context),
      newline:  false
    };

  document.push(object);
}

function document_insert_character(context, document, character, width)
{
  // 得到光标所在的对象
  const object = document[context.caret.path[0]];

  // 得到光标在当前对象字符中的位置
  const offset = context.caret.path[1];

  if (object.text.length === offset)
  {
    // 直接追加
    object.text += character;
  }
  else
  {
    // 根据 context.caret.path[1] 得到需要插入的位置
    object.text = string_insert(object.text, offset, character);
  }

  // 可能会扩展边界盒，可能不会，只是把末尾字符顶到下一个对象
  object.bounding.extend_right(width);

  // 光标位置变化
  context.caret.path[1] = offset + 1;

  // 并影响后续所有的行
  ;
}


class Editor
{
  constructor()
  {
    console.log('Editor constructor');

    this.background = '#f0f0f0';

    this.renderer = null;

    this.size = null;

    this.document = null;

    this.caret = null;
  }

  attach(canvas)
  {
    canvas.style.cursor = 'text';

    this.size = { width: canvas.width, height: canvas.height };

    this.renderer = new Renderer(canvas);

    this.caret = new Rectangle(0, 0, 0, 0);

    // 测试

    this.renderer.clear(this.background, this.size);

    this.context = new Context();

    this.context.reset(this.size);

    this.document = [];

    // 至少有一行
    document_add_object(this.context, this.document);

    // 测试
    //
    const texts = 'HTML5 Canvas 文档编辑器\n\n这是一段文本测试，文字会在边界处换行，目前 English 不支持整单词换行。\n\n按下 Enter 也会换行，现在需要做的，是上下左右移动光标。';

    this.insert(texts);
    //
    // 测试

    this.render();
  }

  render()
  {
    // 目前使用传统的绘制流程
    // 如果后期遇到性能问题（不太可能），再优化

    // 全部擦除

    this.renderer.clear(this.background, this.size);

    // 设置 viewport 等
    //
    // 移动（滚动），缩放

    // 绘制 document

    for (const object of this.document)
    {
      this.renderer.draw_text(object.text, object.bounding.left, object.baseline, '#000000');
    }

    // 绘制 光标

    caret_draw(this.context, this.renderer, this.caret);
  }

  insert(text)
  {
    for (const character of text)
    {
      if (character === '\n')
      {
        document_insert_break(this.context, this.document);

        // 然后切换到下一行
        this.context.break_line();

        // 产生新的对象
        document_add_object(this.context, this.document);
      }
      else
      {
        const width = this.renderer.measure(character);

        // 根据当前光标位置向输入方向判断

        if (!this.context.is_overstep(width))
        {
          // 首先切换到下一行
          this.context.break_line();

          // 产生新的对象

          // todo 或者拆分过去的旧对象

          document_add_object(this.context, this.document);
        }

        // 这句可能会影响多行绘制

        document_insert_character(this.context, this.document, character, width);

        this.context.caret_move(width);
      }
    }

    this.render();
  }

  caret_move_left()
  {
    const path = [ ... this.context.caret.path ];

    if (path[0] === 0 && path[1] === 0) // 整篇文章的头
    {
      return;
    }

    if (path[1] === 0)  // 到了这一行的头了
    {
      // 移动到上一个行对象
      document_object_backward(this.document, this.context);

      // 跳过换行，如果有的话
      // document_object_backward_jump_break(this.document, this.context);
    }
    else
    {
      path[1] -= 1;

      const object = document_get_object(this.document, this.context);

      const character = object.text[path[1]];

      const width = this.renderer.measure(character);

      this.context.caret.path[1] = path[1];

      this.context.caret_move(-width);  // 方向
    }

    this.render();
  }

  caret_move_right()
  {
    let object = document_get_object(this.document, this.context);

    const path = [ ... this.context.caret.path ];

    if (path[0] >= this.document.length - 1 && path[1] >= object.text.length) // 整篇文章的末尾
    {
      return;
    }

    if (path[1] <= object.text.length - 1)
    {
      let character = object.text[path[1]];

      const width = this.renderer.measure(character);

      this.context.caret.path[1] += 1;

      this.context.caret_move(width);  // 方向
    }
    else
    {
      // 移动到下一个行对象

      document_object_forward(this.document, this.context);
    }

    this.render();
  }

  caret_move_top()
  {
  }

  caret_move_bottom()
  {
    ;
  }
}


export default Editor;

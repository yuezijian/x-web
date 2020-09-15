import Caret from './Caret';
import Context from "./Context";
import Rectangle from './Rectangle';
import Renderer  from './Renderer';

import Text from './Text';


function bounding_by_context(context)
{
  const left   = context.bounding.left;
  const right  = context.bounding.left;
  const top    = context.caret.baseline - context.font.height;
  const bottom = context.caret.baseline;

  return new Rectangle(left, right, top, bottom);
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

  return object;
}

// 这个函数对某个对象进行插入操作，但是只影响当前行，并把剩余的内容返回出来

function document_object_push_tail(document, renderer, context, text, mc)
{
  const object = document[context.caret.path[0]];  // 得到光标所在的对象

  // 得到光标在当前对象字符中的位置

  const offset = context.caret.path[1];

  let t_left  = null;
  let t_right = null;

  if (object.text.length === offset)
  {
    // 末尾追加

    t_left  = object.text;
    t_right = text;
  }
  else
  {
    // 插入

    t_left  = object.text.slice(0, offset);
    t_right = text + object.text.slice(offset);
  }

  // 首先得到插入位置左侧的宽度

  let width = 0;

  for (let i = 0; i < offset; ++i)
  {
    width += renderer.measure(object.text[i]);
  }

  const length = t_right.length;

  let index = 0;

  while (index < length)
  {
    const w = renderer.measure(t_right[index]);

    if (width + w <= context.bounding.width())
    {
      index += 1;
      width += w;

      mc(w);

      continue;
    }

    break;
  }

  object.text = t_left + t_right.slice(0, index);

  object.bounding.right = object.bounding.left + width;

  let remaining = t_right.slice(index);

  // if (object.newline)
  // {
  //   remaining += '\n';
  //
  //   object.newline = false;
  // }

  return remaining;
}

// function document_object_insert_text(context, object, text)
// {
//   // 得到光标在当前对象字符中的位置
//
//   const offset = context.caret.path[1];
//
//   // 追加或直接插入
//
//   if (object.text.length === offset)
//   {
//     object.text += text;
//   }
//   else
//   {
//     object.text = string_insert(object.text, offset, text);
//   }
// }



// class Editor
// {
//   attach(canvas)
//   {
//     canvas.style.cursor = 'text';
//
//     this.size = { width: canvas.width, height: canvas.height };
//
//     this.renderer = new Renderer(canvas);
//
//     this.caret = new Rectangle(0, 0, 0, 0);
//
//     // 测试
//
//     this.renderer.clear(this.background, this.size);
//
//     this.context = new Context();
//
//     this.context.reset(this.size);
//
//     this.document = [];
//
//     // 至少有一行
//     document_add_object(this.context, this.document);
//
//     // 测试
//     //
//     // const texts = 'HTML5 Canvas 文档编辑器\n\n这是一段文本测试，文字会在边界处换行，目前 English 不支持整单词换行。\n\n按下 Enter 也会换行，现在需要做的，是上下左右移动光标。';
//     // const texts = 'HTML5 Canva 文档编辑器。这是一段文本测试，文字会在边界处换行，目前 English 不支持整单词换行。按下 Enter 也会换行，现在需要做的，是上下左右移动光标。';
//     const texts = 'HTML5 Canvas';
//     // const texts = '1234567890 1234567890 1234567890 1234567890';
//
//     this.insert(texts);
//     //
//     // 测试
//
//     this.render();
//   }
//
//   render()
//   {
//     // 目前使用传统的绘制流程
//     // 如果后期遇到性能问题（基本上不可能），再优化
//
//     // 全部擦除
//
//     this.renderer.clear(this.background, this.size);
//
//     // 设置 viewport 等
//     //
//     // 移动（滚动），缩放
//
//     // 绘制 document
//
//     for (const object of this.document)
//     {
//       this.renderer.draw_text(object.text, object.bounding.left, object.baseline, '#000000');
//     }
//
//     // 绘制 光标
//
//     caret_draw(this.context, this.renderer, this.caret);
//   }
//
//   // insert(text)
//   // {
//   //   for (const character of text)
//   //   {
//   //     if (character === '\n')
//   //     {
//   //       document_insert_break(this.context, this.document);
//   //
//   //       // 然后切换到下一行
//   //       this.context.newline();
//   //
//   //       // 产生新的对象
//   //       document_add_object(this.context, this.document);
//   //     }
//   //     else
//   //     {
//   //       // 因为新增了插入行为
//   //       // 这里的逻辑变成了
//   //       //
//   //       // 总是判断当前行宽度，和上下文环境宽度
//   //
//   //       const width = this.renderer.measure(character);
//   //
//   //       // 根据当前光标位置向输入方向判断
//   //
//   //       if (!this.context.is_overstep(width))
//   //       {
//   //         // 首先切换到下一行
//   //         this.context.newline();
//   //
//   //         // 产生新的对象
//   //
//   //         document_add_object(this.context, this.document);
//   //       }
//   //
//   //       document_insert_character(this.renderer, this.context, this.document, character, width);
//   //
//   //       this.context.caret_move(width);
//   //     }
//   //   }
//   //
//   //   this.render();
//   // }
//
//   insert(text)
//   {
//     let step = 0;
//
//     const move_caret = (width) =>
//     {
//       // 光标需要移动的总数就是 text.length
//
//       if (step < text.length)
//       {
//         step += 1;
//
//         this.context.caret.path[1] += 1;
//         this.context.caret_move(width);
//       }
//     };
//
//     //
//     let remaining = text;
//
//     while (this.context.caret.path[0] < this.document.length)
//     {
//       remaining = document_object_push_tail(this.document, this.renderer, this.context, remaining, move_caret);
//
//       // 这里要综合判断一下，光标需要移动的总数就是 text.length
//
//       // 这里挤出了多少，表示光标移动了多少
//
//       if (remaining !== '')
//       {
//         this.context.newline();
//
//         continue;
//       }
//
//       break;
//     }
//
//     if (remaining !== '')
//     {
//       document_add_object(this.context, this.document);
//
//       while (true)
//       {
//         remaining = document_object_push_tail(this.document, this.renderer, this.context, remaining, move_caret);
//
//         if (remaining !== '')
//         {
//           this.context.newline();
//
//           document_add_object(this.context, this.document);
//
//           continue;
//         }
//
//         break;
//       }
//     }
//
//     this.render();
//   }
//
//   caret_move_left()
//   {
//     const path = [ ... this.context.caret.path ];
//
//     if (path[0] === 0 && path[1] === 0) // 整篇文章的头
//     {
//       return;
//     }
//
//     if (path[1] === 0)  // 到了这一行的头了
//     {
//       // 移动到上一个行对象
//       document_object_backward(this.document, this.context);
//     }
//     else
//     {
//       path[1] -= 1;
//
//       const object = document_get_object(this.document, this.context);
//
//       const character = object.text[path[1]];
//
//       const width = this.renderer.measure(character);
//
//       this.context.caret.path[1] = path[1];
//
//       this.context.caret_move(-width);  // 方向
//     }
//
//     this.render();
//   }
//
//   caret_move_right()
//   {
//     let object = document_get_object(this.document, this.context);
//
//     const path = [ ... this.context.caret.path ];
//
//     if (path[0] >= this.document.length - 1 && path[1] >= object.text.length) // 整篇文章的末尾
//     {
//       return;
//     }
//
//     if (path[1] <= object.text.length - 1)
//     {
//       let character = object.text[path[1]];
//
//       const width = this.renderer.measure(character);
//
//       this.context.caret.path[1] += 1;
//
//       this.context.caret_move(width);  // 方向
//     }
//     else
//     {
//       // 移动到下一个行对象
//
//       document_object_forward(this.document, this.context);
//     }
//
//     this.render();
//   }
// }


class Editor
{
  constructor()
  {
    console.log('Editor constructor');

    this.background = '#ffffff';

    this.renderer = null;

    this.size = null;

    this.document = null;
  }

  attach(canvas)
  {
    canvas.style.cursor = 'text';

    this.size = { width: canvas.width, height: canvas.height };

    this.renderer = new Renderer(canvas);

    // 测试

    this.renderer.clear(this.background, this.size);

    this.document = new Text();
    this.document.set({ baseline: 32, font: { family: 'courier', height: 32 }, color: '#ff0000' });

    this.caret = new Caret(this.document);

    // this.document.insert('这是一个 abcdefghijklmnopqrstuvwxyz 0123456789 ABCDEFGHIJKLMNOPQRSTUVWXYZ 测试');
    this.insert('这是一个 测试');
  }

  render()
  {
    this.renderer.clear(this.background, this.size);

    this.document.draw(this.renderer, this.caret.range());

    this.caret.draw(this.renderer);
  }

  insert(text)
  {
    const range = this.caret.range();

    this.document.mutate(range, text);

    const position = range.begin + text.length;

    this.caret.to({ anchor: position, focus: position });

    this.render();
  }

  delete_backward()
  {
    const range = this.caret.range();

    if (range.begin === range.end)
    {
      range.begin -= 1;

      if (range.begin < 0)
      {
        range.begin = 0;
      }
    }

    this.document.mutate(range, '');

    const position = range.begin;

    this.caret.to({ anchor: position, focus: position });

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

    this.document.mutate(range, '');

    const position = range.begin;

    this.caret.to({ anchor: position, focus: position });

    this.render();
  }

  caret_move_left(hold_anchor)
  {
    this.caret.to_left(1, hold_anchor);

    this.render();
  }

  caret_move_right(hold_anchor)
  {
    this.caret.to_right(1, hold_anchor);

    this.render();
  }

  caret_jump(x, y, hold_anchor)
  {
    this.caret.jump(this.renderer, x, hold_anchor);

    this.render();
  }
}


export default Editor;

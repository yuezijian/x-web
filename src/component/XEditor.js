import React, { useEffect, useRef, useState } from 'react';

import Editor       from './editor/Editor';
import InputAdapter from './editor/InputAdapter';


// function setup(canvas, size)
// {
//   const pixel_ratio = window.devicePixelRatio;
//
//   // canvas.width  = canvas.width  * pixel_ratio;
//   // canvas.height = canvas.height * pixel_ratio;
//
//   // canvas.style.width  = size.width;
//   // canvas.style.height = size.height;
//
//   canvas.style.cursor = 'text';
//
//   const rendering = canvas.getContext('2d');
//
//   // 浏览器检测
//
//   // navigator.appCodeName;
//   // navigator.appName;
//
//   // rendering.scale(pixel_ratio, pixel_ratio);
//
//   rendering.textBaseline = text.baseline.bottom;
//
//   return rendering;
// }
//
// const location =
//   {
//     path: [],
//
//     offset: 0
//   };
//
// const caret = { x: 0, baseline: 0 };

// caret.draw = function (rendering)
// {
//   const width = 2;
//   const height = font.height;
//
//   rendering.fillRect(caret.x, caret.baseline - height, width, height);
// };


// function descendant(node)
// {
//   if (node.children)
//   {
//     for (const [i, n] of node.children.entries())
//     {
//       descendant(n);
//     }
//   }
// }
//
// function compute_caret_position(rendering, cursor)
// {
//   // 目前的做法
//   //
//   // 遍历所有节点（未包含子节点），Bounding 碰撞
//   //
//   // 符合条件的节点，从头开始，逐字宽相加计算光标位置（未来优化可以使用宽度缓存）
//
//   const x = cursor.x;
//   const y = cursor.y;
//
//   // data 作为第一个
//
//   // if (data.bounding)
//   // {
//   //
//   // }
//
//   // for (const [index, node] of nodes.entries())
//   // {
//   //   if (node.bounding.contain_horizontal(y))
//   //   {
//   //     let p = caret.x = node.bounding.left;
//   //
//   //     for (const c of node.value)
//   //     {
//   //       const w = rendering.measureText(c).width;
//   //
//   //       p += w;
//   //
//   //       if (x < p)
//   //       {
//   //         caret.x = p - x < w * 0.5 ? p : p - w;
//   //
//   //         break;
//   //       }
//   //       else
//   //       {
//   //         caret.x = p;
//   //       }
//   //     }
//   //
//   //     caret.baseline = node.bounding.bottom;
//   //
//   //     break;
//   //   }
//   // }
// }

// function draw_text(rendering, context, node)
// {
//   // const bounding = text.draw(rendering, node.value, context.x, context.baseline);
//   //
//   // // 更新边界
//   // node.bounding = bounding;
//   //
//   // context.baseline += font.height * 1.5; // 这里的 font.height 其实也需要来自 context
// }
//
// function draw_list(rendering, context, node)
// {
//   // list 并不知道跟在行标记后面的是什么
//   //
//   // 可能是文本，可能是图片，可能是另外一个list
//   //
//   // 并且行标记字体可能需要独立于内容
//
//   // 计算最大缩进
//   const indent = rendering.measureText(`${ node.children.length }. `).width;
//
//   for (const [index, object] of node.children.entries())
//   {
//     // 绘制标号
//     const bounding = text.draw(rendering, `${ index + 1 }. `, context.x, context.baseline);
//
//     // x 位置变更
//     context.x = indent;
//
//     // 绘制主体内容
//     draw(rendering, context, object);
//
//     // baseline 位置变更
//     // context.baseline += font.height * 1.5;
//
//     // 绘制完成，context 重置
//     context.x = 0;
//   }
//
//   // const bounding = text.draw(rendering, node.value, context.x, context.baseline);
//   //
//   // // 更新边界
//   // node.bounding = bounding;
//   //
//   // context.baseline += font.height * 1.5; // 这里也需要来自 context
// }
//
// function draw(rendering, context, node)
// {
//   if (node.type === 'text')
//   {
//     draw_text(rendering, context, node);
//   }
//
//   if (node.type === 'list')
//   {
//     draw_list(rendering, context, node);
//   }
// }



const editor = new Editor();

const adapter = new InputAdapter(editor);


function XEditor()
{
  const [size] = useState({ width: 420, height: 594 })

  const reference = useRef();

  const element =

    <div>
      <
        input
        type                = 'text'
        style               = { { opacity: 0.2 } }
        onKeyDown           = { event => adapter.key_down(event.nativeEvent) }
        onKeyUp             = { event => adapter.key_up(event.nativeEvent) }
        onInput             = { event => adapter.input(event.nativeEvent) }
        onPaste             = { event => adapter.paste(event.nativeEvent) }
        onCompositionStart  = { event => adapter.composition_start(event.nativeEvent) }
        onCompositionUpdate = { event => adapter.composition_update(event.nativeEvent) }
        onCompositionEnd    = { event => adapter.composition_end(event.nativeEvent) }
        onChange            = { event => adapter.change(event.nativeEvent) }
      />
      <p/>
      <
        canvas
        ref         = { reference }
        tabIndex    = { '0' }
        style       = { { width: size.width, height: size.height } }
        width       = { size.width  * 2 }
        height      = { size.height * 2 }
        onMouseDown = { event => adapter.mouse_down(event.nativeEvent) }
        onMouseUp   = { event => adapter.mouse_up(event.nativeEvent) }
        onMouseMove = { event => adapter.mouse_move(event.nativeEvent) }
      />
    </div>
  ;

  const setup = () =>
  {
    editor.attach(reference.current);

    editor.insert('HTML5 Canvas 电子病历编辑器\n\n需要创建若干测试，以保证在后续开发过程中，已有行为的正确性。\n\n0123456789\nabcdefghijklmnopqrstuvwxyz\nABCDEFGHIJKLMNOPQRSTUVWXYZ\n\n');
    // editor.insert('HTML5 Canvas 文档编辑器');
  };

  useEffect(setup, []);

  return element;
}


export default XEditor;

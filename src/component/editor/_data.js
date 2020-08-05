const data =
  [
    { type: 'h1', children: [{ text: '大标题' }] },
    { type: 'h2', children: [{ text: '小标题' }] },

    { type: 'p', children: [{ text: '' }] },

    {
      type: 'p',

      children:
        [
          { text: '文本：' },
          { text: '粗体', bold: true },
          { text: ' ' },
          { text: '斜体', italic: true },
          { text: ' ' },
          { text: '下划线', underline: true },
          { text: ' ' },
          { text: '组合', bold: true, italic: true, underline: true }
        ],
    },
    { type: 'p', children: [{ text: '有序列表：' }] },
    {
      type: 'ol',

      children:
        [
          { type: 'li', children: [{ text: '粗体', bold: true }] },
          { type: 'li', children: [{ text: '斜体', italic: true }] },
          { type: 'li', children: [{ text: '下划线', underline: true }] }
        ]
    },
    { type: 'p', children: [{ text: '无序列表：' }] },
    {
      type: 'ul',

      children:
        [
          { type: 'li', children: [{ text: '粗体', bold: true }] },
          { type: 'li', children: [{ text: '斜体', italic: true }] },
          { type: 'li', children: [{ text: '下划线', underline: true }] }
        ]
    },
    { type: 'p', children: [{ text: '' }] }
  ];


export default data;

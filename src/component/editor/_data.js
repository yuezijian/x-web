const data =
  [
    {
      type: 'grid',

      children:
        [
          {
            type: 'row',

            children:
              [
                { type: 'column', align: 'left',   children: [{ text: '众阳健康' }]},
                { type: 'column', align: 'center', children: [{ type: 'variable', children: [{ text: 'Version' }] }] },
                { type: 'column', align: 'right',  children: [{ type: 'variable', children: [{ text: 'Date'    }] }] }
              ]
          },
          {
            type: 'row',

            children:
              [
                {
                  type: 'column',

                  children:
                    [
                      { type: 'p', children: [{ text: '' }] },

                      { type: 'h4', align: 'center', children: [{ text: '电子病历编辑器' }] },

                      { type: 'p', children: [{ text: '' }] },

                      {
                        type: 'table',

                        children:
                          [
                            {
                              type: 'thead',

                              children:
                                [
                                  {
                                    type: 'tr',

                                    children:
                                      [
                                        { type: 'th', children: [{ text: '元素' }] },
                                        { type: 'th', span: { column: 2 }, children: [{ text: '示例' }] }
                                      ]
                                  }
                                ]
                            },
                            {
                              type: 'tbody',

                              children:
                                [
                                  {
                                    type: 'tr',

                                    children:
                                      [
                                        { type: 'td', children: [{ text: '列表' }] },
                                        {
                                          type: 'td',

                                          children:
                                            [
                                              {
                                                type: 'ol',

                                                children:
                                                  [
                                                    { type: 'li', children: [{ text: '一个' }] },
                                                    { type: 'li', children: [{ text: '有序' }] },
                                                    { type: 'li', children: [{ text: '列表' }] }
                                                  ]
                                              }
                                            ]
                                        },
                                        {
                                          type: 'td',

                                          children:
                                            [
                                              {
                                                type: 'ul',

                                                children:
                                                  [
                                                    { type: 'li', children: [{ text: '一个' }] },
                                                    { type: 'li', children: [{ text: '无序' }] },
                                                    { type: 'li', children: [{ text: '列表' }] }
                                                  ]
                                              }
                                            ]
                                        }
                                      ]
                                  },
                                  {
                                    type: 'tr',

                                    children:
                                      [
                                        { type: 'td', children: [{ text: '图片' }] },
                                        {
                                          type: 'td',

                                          span: { column: 2 },

                                          children:
                                            [
                                              { type: 'image', url: 'http://localhost:3000/screen.jpeg', children: [{ text: '' }] },
                                            ]
                                        }
                                      ]
                                  },
                                  {
                                    type: 'tr',

                                    children:
                                      [
                                        { type: 'td', span: { row: 2 }, children: [{ text: '模版' }] },
                                        {
                                          type: 'td',

                                          children:
                                            [
                                              { type: 'constant', children: [{ text: '括号内可编辑：【' }] },
                                              { type: 'text',     children: [{ text: 'Hello', color: '#ff0000' }] },
                                              { type: 'constant', children: [{ text: '】' }] }
                                            ]
                                        },
                                        {
                                          type: 'td',

                                          children:
                                            [
                                              {
                                                type: 'select',

                                                options: [ '下拉', 'abc', '123' ],

                                                children: [{ text: '' }]
                                              }
                                            ]
                                        }
                                      ]
                                  },
                                  {
                                    type: 'tr', children:
                                      [
                                        {
                                          type: 'td',

                                          children:
                                            [
                                              { type: 'text', children: [{ text: '下拉' }] }
                                            ]
                                        },
                                        { type: 'td', children: [{ text: '变量' }] }
                                      ]
                                  }
                                ]
                            }
                          ]
                      },

                      { type: 'p', children: [{ text: '' }] },

                      {
                        type: 'p',

                        children:
                          [
                            { text: '主诉：', bold: true },
                            { text: '主诉内容' },
                          ]
                      },
                      {
                        type: 'p',

                        children:
                          [
                            { text: '现病史：', bold: true },
                            { text: '内容' },
                          ]
                      },
                      {
                        type: 'p',

                        children:
                          [
                            { text: '既往史：', bold: true },
                            { text: '内容' },
                          ]
                      },

                      { type: 'p', children: [{ text: '目前正在实现：分页，报告续打。' }] },
                      { type: 'p', children: [{ text: '' }] },
                      { type: 'p', children: [{ text: '' }] },
                      { type: 'p', children: [{ text: '' }] },
                      { type: 'p', children: [{ text: '' }] },
                      { type: 'p', children: [{ text: '' }] },
                      { type: 'p', children: [{ text: '' }] },
                      { type: 'p', children: [{ text: '' }] }
                    ]
                },
              ]
          },
          {
            type: 'row',

            children:
              [
                { type: 'column', align: 'left',   children: [{ text: '页脚-左' }]},
                { type: 'column', align: 'center', children: [{ type: 'variable', children: [{ text: 'Page' }] }] },
                { type: 'column', align: 'right',  children: [{ text: '页脚-右' }]}
              ]
          }
        ]
    }
  ];


export default data;

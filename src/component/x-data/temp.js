const t1 =
  [
    { index: 0, name: 'this', type: 'type', note: 'note' },
    { index: 1, name: 'is a', type: 'type', note: 'note' },
    { index: 2, name: 'draw', type: 'type', note: 'note' },
    { index: 3, name: 'test', type: 'type', note: 'note' },
    { index: 4, name: 'test', type: 'type', note: 'note' }
  ];

const t2 =
  [
    { index: 0, name: 'this', type: 'type', note: 'note' },
    { index: 1, name: 'is a', type: 'type', note: 'note' },
    { index: 2, name: 'draw', type: 'type', note: 'note' }
  ];

const t3 =
  [
    { index: 0, name: 'this', type: 'type', note: 'note' },
    { index: 1, name: 'is a', type: 'type', note: 'note' },
    { index: 2, name: 'draw', type: 'type', note: 'note' },
    { index: 3, name: 'test', type: 'type', note: 'note' },
    { index: 4, name: 'test', type: 'type', note: 'note' },
    { index: 5, name: 'test', type: 'type', note: 'note' },
    { index: 6, name: 'test', type: 'type', note: 'note' }
  ];

const pj1 =
  {
    index: 0,

    name: 'the project 1',

    objects:
      [
        { index: 0, name: 't1', properties: t1, expand: false },
        { index: 1, name: 't2', properties: t2, expand: false },
        { index: 2, name: 't3', properties: t3, expand: false }
      ],

    expand: false,

    width: 0
  };

const pj2 =
  {
    index: 1,

    name: 'the project 2',

    objects:
      [
        { index: 0, name: 't1', properties: t1, expand: false },
        { index: 1, name: 't2', properties: t3, expand: false }
      ],

    expand: false,

    width: 0
  };

const data =
  {
    name: 'the domain',

    projects: [ pj1, pj2 ]
  };


export default { data };

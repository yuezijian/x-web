import React from 'react'

import * as d3 from 'd3';

import D3SVG from './D3SVG';

import XQuery from './XQuery';

import option from './x-data/option';
import svg    from './x-data/svg';

import table from './x-data/table';


const q =
  `
  query
  {
    projects
    {
      index
      name

      namespaces
      {
        index
        name

        objects
        {
          index
          name
          note

          properties
          {
            index
            name
            type
            note
          }
        }
      }
    }
  }
  `
;



const my_scene = {};


// 在数据中加入 expand 属性，根据所有节点的这个属性，重新计算相关尺寸和距离

function init(data)
{
  for (const project of data.projects)
  {
    project.expand = true;

    for (const namespace of project.namespaces)
    {
      namespace.expand = true;

      for (const object of namespace.objects)
      {
        object.expand = false;
      }
    }
  }
}

// 这个函数只管根据 expand 属性生成绘制数据

function aa()
{
  ;
}

// 这个函数只管计算 layout

function layout_objects(objects)
{
  let x = -option.table.spacing;

  for (const object of objects)
  {
    x += option.table.spacing;

    object.x = x;
    object.y = 0;

    x += object.expand ? option.table.width : option.table.head.width;
  }

  return x; // 总宽度值
}


function layout_projects(projects)
{
  let x = -option.table.spacing; // 这里暂时使用 table 的配置

  for (const project of projects)
  {
    x += option.table.spacing;

    project.x = x;
    project.y = 0;

    // 当前 project 下所有子节点的宽度
    const w = layout_objects(project.objects);

    // x += project.expand ? w : option.table.head.width;
    x += w;
  }

  return x;
}

// function layout1(data)
// {
//   let x_object = 0;
//
//   for (const project of data.projects)
//   {
//     for (const namespace of project.namespaces)
//     {
//       const b_namespace = { x: x_object, width: 0 };
//
//       for (const object of namespace.objects)
//       {
//         const y_object = 180;
//
//         object.x = x_object;
//         object.y = y_object;
//
//         // object.link = { x: x + option.table.width * 0.5, y };
//
//         x_object += object.expand ? option.table.width : option.table.head.width;
//         x_object += option.table.spacing;
//
//         b_namespace.width += object.expand ? option.table.width : option.table.head.width;
//       }
//
//       const y_namespace = 80;
//
//       namespace.x = b_namespace.x + (b_namespace.width + option.table.spacing * (namespace.objects.length - 1)) * 0.5;
//       namespace.y = y_namespace;
//     }
//   }
// }



function setup_project(node, layout_callback)
{
  // 也需要画一个 label

  const g_label = node.append('g')

  g_label.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 180)
    .attr('height', 30)
    .on('click', () => layout_callback())
  ;

  g_label.append('text')
    .text(d => d.name)
    .attr('x', 0)
    .attr('y', 0)
    .attr('font-size', 24)
    .attr('text-anchor', svg.text.text_anchor.start)
    .attr('dominant-baseline', svg.text.dominant_baseline.hanging)
    .attr('fill', '#ffffff')
  ;

  const d_object =
    {
      enter(selection)
      {
        const g = selection.append('g')
          .attr('transform', d => `translate( ${ d.x } 0 )`)
        ;

        new table(g, () => { layout_callback(); g.attr('transform', d => `translate( ${ d.x } 0 )`); });

        return g;
      },

      update(selection)
      {
        // selection.attr('transform', d => `translate( ${ d.x } 0 )`);

        // selection.select('rect')
        //   .attr('width', d => d.expand ? option.table.width : option.table.head.width)
        // ;

        return selection;
      },

      exit(selection)
      {
        return selection.remove();
      }
    };

  // const g_body = node.append('g').attr('transform', d => `translate( 0 40 )`);
  //
  // g_body.selectAll('g')
  //   .data(d => d.objects, d => d.index)
  //   .join(d_object.enter, d_object.update, d_object.exit)
  // ;
}

my_scene.setup = function(root, data, size)
{
  layout_projects(data.projects);

  const g_project = root;//.append('g').attr('transform', 'translate( 0 0 )');

  const jj =
    {
      enter(selection)
      {
        const g = selection.append('g')
          .attr('transform', d => `translate( ${ d.x } 0 )`)
          .attr('id', d => `project-${ d.index }`)
        ;

        setup_project(g, () =>
        {
          data.projects[0].objects[0].expand = !data.projects[0].objects[0].expand;

          layout_projects(data.projects);

          g_project.selectAll('g')
            .data(data.projects)
            .join(jj.enter, jj.update, jj.exit)
          ;
        }
        );
      },

      update(selection)
      {
        selection.attr('transform', d => `translate( ${ d.x } 0 )`);
      },

      exit(selection)
      {
        selection.remove();
      }
    };

  g_project.selectAll('g')
    .data(data.projects)
    .join(jj.enter, jj.update, jj.exit)
  ;
};


function View()
{
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

      expand: false
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

      expand: false
    };

  const data =
    {
      name: 'the domain',

      projects: [ pj1, pj2 ]
    };

  const element =

    <D3SVG width={ 1200 } height={ 800 } scene={ my_scene } data={ data }/>
  ;

  return element;
}


export default View;

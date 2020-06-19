import React from 'react'

import * as d3 from 'd3';

import D3SVG from './D3SVG';

import XQuery from './XQuery';

import option from './x-data/option';
import svg    from './x-data/svg';


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

function layout(data)
{
  let x_object = 0;

  for (const project of data.projects)
  {
    for (const namespace of project.namespaces)
    {
      const b_namespace = { x: x_object, width: 0 };

      for (const object of namespace.objects)
      {
        const y_object = 180;

        object.x = x_object;
        object.y = y_object;

        // object.link = { x: x + option.table.width * 0.5, y };

        x_object += object.expand ? option.table.width : option.table.label.width;
        x_object += option.table.spacing;

        b_namespace.width += object.expand ? option.table.width : option.table.label.width;
      }

      const y_namespace = 80;

      namespace.x = b_namespace.x + (b_namespace.width + option.table.spacing * (namespace.objects.length - 1)) * 0.5;
      namespace.y = y_namespace;
    }
  }
}


let expand = false;



function draw_row(node, data, transition, callback)
{
  const cell =
    {
      enter(selection)
      {
        const g = selection.append('g')
          .attr('transform', `translate( 0 ${ -option.table.cell.height } )`)
          .call(s => s.transition(transition).attr('transform', (d, i) => `translate( 0 ${ i * option.table.cell.dy + 1 } )`))
        ;

        g.append('rect')
          .attr('x', option.table.column[0].x)
          .attr('y', 0)
          .attr('width', option.table.column[0].width)
          .attr('height', option.table.cell.height)
          .attr('fill', option.table.cell.color)
        ;

        g.append('text')
          .text(d => d.name)
          .attr('x', option.table.column[0].x + option.table.cell.margin)
          .attr('y', (d, i) => option.table.cell.margin + 1)
          .attr('font-size', option.font.height)
          .attr('text-anchor', svg.text.text_anchor.start)
          .attr('dominant-baseline', svg.text.dominant_baseline.hanging)
          .attr('fill', option.font.color)
        ;

        g.append('rect')
          .attr('x', option.table.column[1].x)
          .attr('y', 0)
          .attr('width', option.table.column[1].width)
          .attr('height', option.table.cell.height)
          .attr('fill', option.table.cell.color)
        ;

        g.append('text')
          .text(d => d.type)
          .attr('x', option.table.column[1].x + option.table.cell.margin)
          .attr('y', (d, i) => option.table.cell.margin + 1)
          .attr('font-size', option.font.height)
          .attr('text-anchor', svg.text.text_anchor.start)
          .attr('dominant-baseline', svg.text.dominant_baseline.hanging)
          .attr('fill', option.font.color)
        ;

        g.append('rect')
          .attr('x', option.table.column[2].x)
          .attr('y', 0)
          .attr('width', option.table.column[2].width)
          .attr('height', option.table.cell.height)
          .attr('fill', option.table.cell.color)
        ;

        g.append('text')
          .text(d => d.note)
          .attr('x', option.table.column[2].x + option.table.cell.margin)
          .attr('y', (d, i) => option.table.cell.margin + 1)
          .attr('font-size', option.font.height)
          .attr('text-anchor', svg.text.text_anchor.start)
          .attr('dominant-baseline', svg.text.dominant_baseline.hanging)
          .attr('fill', option.font.color)
        ;
      },

      update(selection)
      {
      },

      exit(selection)
      {
        const logic = s => s.transition(transition)
          .attr('transform', `translate( 0 ${ -option.table.cell.height } )`)
          .remove()
          .end()
          .then(() => callback ? callback() : null)
        ;

        selection.call(logic);
      }
    };

  node.selectAll('g').data(data, d => d.index).join(cell.enter, cell.update, cell.exit);
}

function label_setup(node)
{
  ;
}

function my_draw(node, data, size)
{
  const transition = node.transition();//.duration(200);

  const g_body  = node.append('g').attr('transform', `translate( 0 ${ option.table.label.height } )`);
  const g_label = node.append('g');

  // 这些是不需要 data join 的部分

  g_label.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', expand ? option.table.width : option.table.label.width)
    .attr('height', option.table.label.height)
    .attr('fill', option.table.label.color)
    .on('click',
      function()
      {
        expand = !expand;

        if (expand)
        {
          const logic = s => s.transition(transition)
            .attr('width', expand ? option.table.width : option.table.label.width)
            .end()
            .then(() => draw_row(g_body, expand ? data : [], transition))
          ;

          d3.select(this).call(logic);
        }
        else
        {
          const logic = s => s.transition(transition)
            .attr('width', expand ? option.table.width : option.table.label.width)
          ;

          draw_row(g_body, expand ? data : [], transition, () => d3.select(this).call(logic));
        }
      }
    )
  ;

  g_label.append('text')
    // .text(d => `${ d.name } [${ d.note }]`)
    .text('TableName 表名称')
    .attr('x', option.table.label.margin)
    .attr('y', option.table.label.margin + 1)
    .attr('font-size', option.table.label.font.height)
    .attr('text-anchor', svg.text.text_anchor.start)
    .attr('dominant-baseline', svg.text.dominant_baseline.hanging)
    .attr('fill', option.table.label.font.color)
  ;

  // 这是需要 data join 的部分

  draw_row(g_body, expand ? data : [], transition);
}

my_scene.setup = function(root, data, size)
{
  // 首先根据自带状态生成绘制数据

  my_draw(root.append('g'), data, size);
};


function View()
{
  const data =
    [
      { index: 0, name: 'this', type: 'type', note: 'note' },
      { index: 1, name: 'is a', type: 'type', note: 'note' },
      { index: 2, name: 'draw', type: 'type', note: 'note' },
      { index: 3, name: 'test', type: 'type', note: 'note' }
    ];

  const element =

    <D3SVG width={ 1200 } height={ 800 } scene={ my_scene } data={ data }/>
  ;

  return element;
}


export default View;

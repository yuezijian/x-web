import React from 'react'

import D3SVG from './D3SVG';

import XQuery from './XQuery';


const q =
  `
  query
  {
    projects
    {
      id
      name

      namespaces
      {
        id
        name

        objects
        {
          id
          name
          note

          properties
          {
            id
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


const svg =
  {
    text:
      {
        text_anchor:
          {
            start:  'start',
            middle: 'middle',
            end:    'end'
          },

        dominant_baseline:
          {
            auto:         'auto',
            text_bottom:  'text-bottom',
            alphabetic:   'alphabetic',
            ideographic:  'ideographic',
            middle:       'middle',
            central:      'central',
            mathematical: 'mathematical',
            hanging:      'hanging',
            text_top:     'text-top'
          }
      }
  };

const option =
  {
    font:
      {
        height: 12,

        color: '#ffffff'
      },

    table:
      {
        label:
          {
            color: '#000000',

            margin: 8,

            font:
              {
                height: 18,

                color: '#d5d5d5'
              },

            width: 280
          },

        cell:
          {
            color: '#323232',

            margin: 4
          },

        column:
        [
          { width: 140 },
          { width: 100 },
          { width: 300 }
        ],

        spacing: 10
      }
  };

option.table.width = option.table.column.reduce((a, c) => a + c.width, 0) + option.table.column.length - 1;

option.table.label.height = option.table.label.font.height + option.table.label.margin * 2;

option.table.cell.dy     = option.font.height + option.table.cell.margin * 2 + 1;
option.table.cell.height = option.font.height + option.table.cell.margin * 2;


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
        object.expand = true;
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

function draw_object_label(g)
{
  g.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', d => d.expand ? option.table.width : option.table.label.width)
    .attr('height', option.table.label.height)
    .attr('fill', option.table.label.color)
    // .on('click', d => { d.expand = !d.expand; my_draw(my_scene.root, my_scene.data, my_scene.size); })
  ;

  g.append('text')
    .text(d => `${ d.name } [${ d.note }]`)
    .attr('x', option.table.label.margin)
    .attr('y', option.table.label.margin)
    .attr('font-size', option.table.label.font.height)
    .attr('text-anchor', svg.text.text_anchor.start)
    .attr('dominant-baseline', svg.text.dominant_baseline.hanging)
    .attr('fill', option.table.label.font.color)
  ;
}

function object_property_enter(g, key, x, width)
{
  g.append('rect')
    .attr('x', x)
    .attr('y', (d, i) => i * option.table.cell.dy + option.table.label.height + 1)
    .attr('width', width)
    .attr('height', option.table.cell.height)
    .attr('fill', option.table.cell.color)
  ;

  g.append('text')
    .text(d => d[key])
    .attr('x', x + option.table.cell.margin)
    .attr('y', (d, i) => i * option.table.cell.dy + option.table.cell.margin + option.table.label.height + 2)
    .attr('font-size', option.font.height)
    .attr('text-anchor', svg.text.text_anchor.start)
    .attr('dominant-baseline', svg.text.dominant_baseline.hanging)
    .attr('fill', option.font.color)
  ;
}


function my_draw(root, data, size)
{
  layout(data);

  console.log(data)

  root.attr('transform', 'translate( 0 0 )');

  const g_project = root.append('g')
    .selectAll('g')
    .data(data.projects, d => d.id)
    .enter()
    .append('g')
  ;

  const g_namespace = g_project.selectAll('g')
    .data(d => d.namespaces, d => d.id)
    .enter()
    .append('g')
  ;

  g_namespace.append('text')
    .text(d => d.name)
    .attr('x', d => d.x)
    .attr('y', d => d.y)
    .attr('font-size', 30)
    .attr('text-anchor', svg.text.text_anchor.middle)
    .attr('dominant-baseline', svg.text.dominant_baseline.hanging)
    .attr('fill', '#ff0000')
  // .each(d => console.log(d))
  ;

  const g_object = g_namespace.selectAll('g')
    .data(d => d.objects, d => d.id)
    .enter()
    .append('g')
    .attr('transform', d => `translate( ${ d.x } ${ d.y } )`)
    // .attr('transform', d => console.log(d))
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 100)
    .attr('height', 100)
  ;

  // draw_object_label(g_object);

  return;

  const g_property_update = g_object.selectAll('g').data(d => d.properties, d => d.id);
  const g_property_enter  = g_property_update.enter().append('g');
  const g_property_exit   = g_property_update.exit();

  const g_property_all = g_property_update.merge(g_property_enter);

  object_property_enter(g_property_enter, 'name', 0, 140);
  // object_property_enter(g_property_enter, 'type', 141, 100);
  // object_property_enter(g_property_enter, 'note', 242, 300);

  g_property_exit.remove();

  // const rt = d3.hierarchy(database, (d) => d.tables);
  //
  // const tree = d3.tree()
  //   .size([300, 200])
  //   .nodeSize([30, 30])
  //   // .separation((a, b) => a.data.properties.length < b.data.properties.length ? a.data.properties.length : b.data.properties.length)
  //   .separation((a, b) => b.data.properties.length * 0.9)
  // ;
  //
  // tree(rt);
  //
  // const nodes = rt.descendants();
  // const links = rt.links();
  //
  // nodes.splice(0, 1);
  //
  // const gtb = root.append('g').selectAll('g')
  //   .data(nodes, d => d.data.id)
  //   .enter()
  // ;
  //
  // root.append('g')
  //   .attr('fill', 'none')
  //   .attr('stroke', '#555')
  //   .attr('stroke-width', 1.5)
  //   .selectAll('path')
  //   .data(links)
  //   .join('path')
  //   .attr('d', d3.linkHorizontal()
  //     .x(d => d.y)
  //     .y(d => d.x))
  // ;
  //
  // const gg = gtb.append('g')
  //   .attr('transform', d => `translate( ${ d.y + 20 }, ${ d.x } )`)
  // ;
  //
  // gg.append('text')
  //   .text(d => d.data.name)
  //   .attr('font-size', option.font.height)
  //   // .attr('text-anchor', 'middle')
  //   .attr('dominant-baseline', 'middle')
  // //   .attr('x', 20 + margin.x)
  // //   .attr('y', (d, i) => 20 + i * (font.height + margin.y * 2 ))
  // //   .attr('fill', '#ffffff')
  // ;
}

my_scene.setup = function(root, data, size)
{
  this.root = root;
  this.data = data;
  this.size = size;

  // 首先根据自带状态生成绘制数据

  my_draw(root, data, size);
};


function View()
{
  const element =

    <XQuery query={ q }>
      {
        (data) =>
        {
          init(data);

          return <D3SVG width={ 50000 } height={ 1200 } scene={ my_scene } data={ data }/>
        }
      }
    </XQuery>
  ;

  return element;
}


export default View;

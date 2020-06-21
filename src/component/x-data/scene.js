import * as d3 from 'd3';

import option from './option';
import svg from './svg';

import table from './table';


const my_scene = {};


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

    project.width = w;

    console.log(w)
  }

  return x;
}

function d_object(cbb)
{
  const aa =
    {
      enter(selection)
      {
        const g = selection.append('g')
          .attr('transform', d => `translate( ${ d.x } 0 )`)
        ;

        new table(g, cbb);

        return g;
      },

      update(selection)
      {
        selection
          // .each(d => console.log(d))
          .attr('transform', d => `translate( ${ d.x } 0 )`)
        ;

        return selection;
      },

      exit(selection)
      {
        return selection.remove();
      }
    };

  return aa;
}


function create_join(cbb)
{
  const jj1 =
    {
      enter(selection)
      {
        const g = selection.append('g')
          .classed('my', true)
          .attr('transform', d => `translate( ${ d.x } 0 )`)
          .attr('id', d => `project-${ d.index }`)
        ;

        const t = g.append('g');

        t.append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 180)
          .attr('height', 30)
        // .on('click', () => upp())
        ;

        t.append('text')
          .text(d => d.name)
          .attr('x', 0)
          .attr('y', 0)
          .attr('font-size', 24)
          .attr('text-anchor', svg.text.text_anchor.start)
          .attr('dominant-baseline', svg.text.dominant_baseline.hanging)
          .attr('fill', '#ffffff')
        ;

        // 所有子表（节点）

        const c = g.append('g')
          .attr('transform', 'translate( 0, 60 )')
        ;

        const obj = d_object(cbb);

        c.selectAll('g')
          .data(d => d.objects, d => d.index)
          .join(obj.enter, obj.update, obj.exit)
        ;

        return g;
      },

      update(selection)
      {
        return selection.attr('transform', d => `translate( ${ d.x } 0 )`);
      },

      exit(selection)
      {
        return selection.remove();
      }
    };

  return jj1;
}



my_scene.setup = function(root, data, size)
{
  layout_projects(data.projects);

  const g_project = root.append('g');

  let upp = null;

  const callback = () =>
  {
    layout_projects(data.projects);

    upp();
  };

  const jj = create_join(callback);

  upp = () =>
  {
    g_project.selectAll('.my')
      .data(data.projects, d => d.index)
      .join(jj.enter, jj.update, jj.exit)
    ;
  };

  upp();

  // root.append('g')
  //   .attr('transform', 'translate( 100 300 )')
  //   .append('rect')
  //   .attr('x', 0)
  //   .attr('y', 0)
  //   .attr('width', 180)
  //   .attr('height', 30)
  //   .on('click', () =>
  //     {
  //       data.projects[0].objects[0].expand = !data.projects[0].objects[0].expand;
  //
  //       layout_projects(data.projects);
  //
  //       upp();
  //     }
  //   )
  // ;
};


export default my_scene;

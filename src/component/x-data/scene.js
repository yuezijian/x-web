import * as d3 from 'd3';

import option from './option';

import project_join from './project';


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

    // project.width = w;
  }

  return x;
}


function zoom()
{
  const transform = d3.event.transform;
}

my_scene.setup = function(svg, root, data, size)
{
  const projects = data.domains[0].projects;

  layout_projects(projects);

  const g_project = root.append('g');

  svg.call(d3.zoom().on('zoom', () => g_project.attr('transform', d3.event.transform)));

  let upp = null;

  const callback = () =>
  {
    layout_projects(projects);

    upp();
  };

  const jj = project_join(callback);

  upp = () =>
  {
    g_project.selectAll('.project')
      .data(projects, d => d.index)
      .join(jj.enter, jj.update, jj.exit)
    ;
  };

  upp();
};


export default my_scene;

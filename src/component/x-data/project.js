/*

绘制一个顶节点，和一层子节点

子节点的宽度和位置会变化

子节点可以展开成为一个表

*/


import svg from './svg';

import table from './table';


function d_table(cbb)
{
  const aa =
    {
      enter(selection)
      {
        const g = selection.append('g')
          .classed('object', true)
          .attr('transform', d => `translate( ${ d.x } 0 )`)
        ;

        new table(g, cbb);

        return g;
      },

      update(selection)
      {
        // 这里没有数据
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

function project_join(cbb)
{
  const obj = d_table(cbb);

  const join =
    {
      enter(selection)
      {
        const g = selection.append('g')
          .classed('project', true)
          .attr('transform', d => `translate( ${ d.x } 0 )`)
          .attr('id', d => `project-${ d.index }`)
        ;

        const t = g.append('g');

        t.append('rect')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 180)
          .attr('height', 30)
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

        c.selectAll('.object')
          .data(d => d.objects, d => d.index)
          .join(obj.enter, obj.update, obj.exit)
        ;

        return g;
      },

      update(selection)
      {
        selection
          .attr('transform', d => `translate( ${ d.x } 0 )`)
          .selectAll('.object')
          .attr('transform', d => `translate( ${ d.x } 0 )`)
        ;

        return selection;
      },

      exit(selection)
      {
        return selection.remove();
      }
    };

  return join;
}


export default project_join;

import * as d3 from 'd3';

import option from './option';
import svg from    './svg';


class table
{
  constructor(node, callback)
  {
    this.body = node.append('g').attr('transform', `translate( 0 ${ option.table.head.height } )`);
    this.head = node.append('g');

    const transition = node.transition();

    this.join =
      {
        enter(selection)
        {
          const g = selection.append('g')
            // .attr('transform', `translate( 0 ${ -option.table.cell.height } )`)
            // .call(s => s.transition(transition).attr('transform', (d, i) => `translate( 0 ${ i * option.table.cell.dy + 1 } )`))
            .attr('transform', (d, i) => `translate( 0 ${ i * option.table.cell.dy + 1 } )`)
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

          return g;
        },

        update(selection)
        {
          return selection;
        },

        exit(selection)
        {
          return selection.remove();

          // const logic = s => s.transition(transition)
          //   .attr('transform', `translate( 0 ${ -option.table.cell.height } )`)
          //   .remove()
          //   .end()
          //   .then(() => callback ? callback() : null)
          // ;
          //
          // selection.call(logic);
        }
      };

    this.label = null;

    this.callback = callback;

    this.transition = transition;

    this._setup();
  }

  update()
  {
    this.label.attr('width', d => d.expand ? option.table.width : option.table.head.width);

    this.body.selectAll('g')
      .data(d => d.expand ? d.properties : [], d => d.index)
      .join(this.join.enter, this.join.update, this.join.exit)
    ;
  }

  _setup()
  {
    const _this = this;

    this.label = this.head.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', d => d.expand ? option.table.width : option.table.head.width)
      .attr('height', option.table.head.height)
      .attr('fill', option.table.head.color)
      .on('click',
          d =>
          {
            d.expand = !d.expand;

            if (this.callback)
            {
              this.callback();
            }

            this.update();
          }
      )
    ;

    this.head.append('text')
      .text(d => `${ d.name }`)
      // .text(d => `${ d.name } [${ d.note }]`)
      .attr('x', option.table.head.margin)
      .attr('y', option.table.head.margin + 1)
      .attr('font-size', option.table.head.font.height)
      .attr('text-anchor', svg.text.text_anchor.start)
      .attr('dominant-baseline', svg.text.dominant_baseline.hanging)
      .attr('fill', option.table.head.font.color)
    ;

    // this.update();
  }

  _click(d, n, c)
  {
    d.expand = !d.expand;

    c.update();

    // if (d.expand)
    // {
    //   const logic = s => s.transition(c.transition)
    //     .attr('width', d.expand ? option.table.width : option.table.head.width)
    //     .end()
    //     .then(() => c.update())
    //   ;
    //
    //   d3.select(n).call(logic);
    // }
    // else
    // {
    //   const logic = s => s.transition(s.transition)
    //     .attr('width', d.expand ? option.table.width : option.table.head.width)
    //   ;
    //
    //   // c.update();
    //   d3.select(n).call(logic);
    //   // draw_row(g_body, d => d.expand ? d.properties : [], transition, () => d3.select(this).call(logic));
    // }
  }
}


export default table;

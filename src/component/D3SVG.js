import React from 'react';

import * as d3 from 'd3';


class D3SVG extends React.Component
{
  constructor(props)
  {
    super(props);

    this.id = this.props.id ? this.props.id : `id-${ Math.random().toString(36).slice(2) }`;
  }

  componentDidMount()
  {
    const svg = d3.select(`#${ this.id }`);

    svg.append('rect')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('fill', '#c9c9c9')
    ;

    const root = svg.append('g').attr('id', 'root');

    this.props.scene.setup(svg, root, this.props.data);
  }

  render()
  {
    const element =

      <div>
        <svg id={ this.id } width='100%' height='800'/>
      </div>
    ;

    return element;
  }
}


export default D3SVG;

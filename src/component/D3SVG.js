import React from 'react';

import * as d3 from 'd3';


class D3SVG extends React.Component
{
  constructor(props)
  {
    super(props);

    this.id = this.props.id ? this.props.id : `id-${ Math.random().toString(36).slice(2) }`;

    const width  = this.props.width  ? this.props.width  : 200;
    const height = this.props.height ? this.props.height : 200;

    this.state =
      {
        width,
        height
      };
  }

  componentDidMount()
  {
    const svg = d3.select(`#${ this.id }`);

    svg.append('rect')
      .attr('width', this.state.width)
      .attr('height', this.state.height)
      .attr('fill', '#c9c9c9')
    ;

    const root = svg.append('g').attr('id', 'root');

    const size =
      {
        width:  this.state.width,
        height: this.state.height
      };

    this.props.scene.setup(root, this.props.data, size);
  }

  render()
  {
    const element =

      <div>
        <
          svg
          id     = { this.id           }
          width  = { this.state.width  }
          height = { this.state.height }
        />
      </div>
    ;

    return element;
  }
}


export default D3SVG;

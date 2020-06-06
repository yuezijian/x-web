import React from 'react';

import Table from 'react-bootstrap/Table';


class XTable extends React.Component
{
  componentDidMount()
  {
    this.props.subscribe();
  }

  render()
  {
    const row = (item) =>
    {
      const tr =

        <tr key={ item.id }>
          <td>{ item.id   }</td>
          <td>{ item.name }</td>
        </tr>
      ;

      return tr;
    }

    const element =

      <Table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {
          this.props.items.map(row)
        }
        </tbody>
      </Table>
    ;

    return element;
  }
}


export default XTable;

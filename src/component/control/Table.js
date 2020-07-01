import React from 'react';


function Table({ hover, small, ...props })
{
  let style = 'table';

  style += hover ? ' table-hover' : '';
  style += small ? ' table-sm'    : '';

  const element =

    <table className={ style } { ...props }>
      {
        props.children
      }
    </table>
  ;

  return element;
}


function TD(value, index)
{
  return <td key={ index }>{ value }</td>;
}

function TR(value, index)
{
  const element =

    <tr key={ index }>
      {
        Object.values(value).map(TD)
      }
    </tr>
  ;

  return element;
}

Table.Head = function({ data })
{
  const element =

    <thead>
    <tr>
      {
        data.map((value, index) => <th key={ index }>{ value }</th>)
      }
    </tr>
    </thead>
  ;

  return element;
};

Table.Body = function({ children })
{
  return <tbody>{ children }</tbody>;
};

Table.Row = function({ data, filter })
{
  const element =

    <tr key={ data.id }>
      {/*<td>*/}
      {/*  <input type='checkbox'/>*/}
      {/*</td>*/}
      {
        filter ? filter.map(value => data[value]).map(TD) : Object.values(data).map(TD)
      }
    </tr>
  ;

  return element;
}

Table.Auto = function({ data, ...props })
{
  let body = [{ table: 'no data' }];

  if (data)
  {
    if (data.length !== 0)
    {
      body = data;
    }
  }

  const head = Object.keys(body[0]);

  const element =

    <Table>
      <Table.Head data={ head }/>
      <tbody>
      {
        body.map(value => <Table.Row data={ value }/>)
      }
      </tbody>
    </Table>
  ;

  return element;
};


export default Table;

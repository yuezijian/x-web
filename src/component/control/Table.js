import React from 'react';


function Table({ borderless, hover, small, ...props })
{
  let style = 'table';

  style += borderless ? ' table-borderless' : '';
  style += hover      ? ' table-hover'      : '';
  style += small      ? ' table-sm'         : '';

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

Table.Head = function ({ data })
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

Table.Body = function ({ children })
{
  return <tbody>{ children }</tbody>;
};

Table.Row = function ({ data, ...props })
{
  const element =

    <tr>
      {/*<td>*/}
      {/*  <input type='checkbox'/>*/}
      {/*</td>*/}
      {
        Object.values(data).map(TD)
      }
    </tr>
  ;

  return element;
}

Table.Auto = function ({ data, ...props })
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

Table.Quick = function ({ data, head, filter, ...props })
{
  const element =

    <Table { ...props }>
      <thead>
      <tr>
        {
          head.map((value, index) => <th key={ index }>{ value }</th>)
        }
      </tr>
      </thead>
      <tbody>
      {
        data.map((value, index) => <Table.Row key={ index } data={ filter ? filter.map(key => value[key]) : value }/>)
      }
      </tbody>
    </Table>
  ;

  return element;
};


export default Table;

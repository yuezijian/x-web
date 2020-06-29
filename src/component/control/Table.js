import React from 'react';


function Table({ head, body, hover, small, ...props })
{
  let style = 'table';

  // style += hover ? ' table-hover' : '';
  // style += small ? ' table-sm'    : '';

  const element =

    <table className={ style }>
      <thead>
      <tr>
        {
          head ? head.map((value, index) => <th key={ index } scope='col'>{ value }</th>) : null
        }
      </tr>
      </thead>
      <tbody>
      {
        body ? body() : null
      }
      </tbody>
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

Table.Auto = function({ data, ...props })
{
  const head = Object.keys(data[0]);

  const body = () => data.map((v, i) => TR(v, i));

  return <Table head={ head } body={ body } { ...props }/>;
}


export default Table;

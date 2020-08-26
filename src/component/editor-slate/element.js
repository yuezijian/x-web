import React, { useRef } from 'react';

import Grid from '../control/Grid';


Element.Type = {};

function Register(type, implement)
{
  Element.Type[type] = implement;
}

const Alignment =
  {
    left:   'justify-content-start',
    center: 'justify-content-center',
    right:  'justify-content-end'
  };

function render_column(attributes, children, element)
{
  const { align } = element;

  let style = 'col';

  style += align ? ` d-flex ${ Alignment[align] }` : '';

  return <div className={ style } { ...attributes }>{ children }</div>;
}

function render_h1(attributes, children, element)
{
  const { align } = element;

  let style = '';

  style += align ? ` d-flex ${ Alignment[align] }` : '';

  return <h1 className={ style } { ...attributes }>{ children }</h1>;
}

function render_h2(attributes, children, element)
{
  const { align } = element;

  let style = '';

  style += align ? ` d-flex ${ Alignment[align] }` : '';

  return <h2 className={ style } { ...attributes }>{ children }</h2>;
}

function render_h3(attributes, children, element)
{
  const { align } = element;

  let style = '';

  style += align ? ` d-flex ${ Alignment[align] }` : '';

  return <h3 className={ style } { ...attributes }>{ children }</h3>;
}

function render_h4(attributes, children, element)
{
  const { align } = element;

  let style = '';

  style += align ? ` d-flex ${ Alignment[align] }` : '';

  return <h4 className={ style } { ...attributes }>{ children }</h4>;
}

function render_p(attributes, children, element)
{
  const { align } = element;

  let style = '';

  style += align ? ` d-flex ${ Alignment[align] }` : '';

  return <p className={ style } { ...attributes }>{ children }</p>;
}

function render_select(attributes, children, element)
{
  const widget =

    <div { ...attributes }>
      <div contentEditable={ false }>
        <select className='form-control'>
          {
            element.options.map((option, index) => <option key={ index }>{ option }</option>)
          }
        </select>
      </div>
    </div>
  ;

  return widget;
}

function render_tr(attributes, children, element)
{
  const { span } = element;

  const properties = {};

  if (span)
  {
    if (span.row)
    {
      properties.rowSpan = span.row;
    }

    if (span.column)
    {
      properties.colSpan = span.column;
    }
  }

  return <tr { ...attributes } { ...properties }>{ children }</tr>;
}

function render_image(attributes, children, element)
{
  const widget =

    <div { ...attributes }>
      <div contentEditable={ false }>
        <img className='rounded mx-auto d-block' src={ element.url } alt='image' style={ { maxWidth: '100%' } }/>
      </div>
    </div>
  ;

  return widget;
}

function render_th(attributes, children, element)
{
  const { span } = element;

  const properties = {};

  if (span)
  {
    if (span.row)
    {
      properties.rowSpan = span.row;
    }

    if (span.column)
    {
      properties.colSpan = span.column;
    }
  }

  return <th { ...attributes } { ...properties }>{ children }</th>;
}

function render_td(attributes, children, element)
{
  const { align, span } = element;

  let style = '';

  style += align ? ` d-flex ${ Alignment[align] }` : '';

  const properties = {};

  if (span)
  {
    if (span.row)
    {
      properties.rowSpan = span.row;
    }

    if (span.column)
    {
      properties.colSpan = span.column;
    }
  }

  return <td className={ style } { ...attributes } { ...properties }>{ children }</td>;
}


const style =
  {
    minWidth: '210mm',
    maxWidth: '210mm',

    minHeight: '297mm',
    maxHeight: '297mm',

    backgroundColor: '#ffffff'
  };


Register('paper', (attributes, children, element) => <div className='m-3' style={ style } { ...attributes }>{ children }</div>);

Register('grid',   (attributes, children, element) => <div className='container fluid py-4' { ...attributes }>{ children }</div>);
Register('row',    (attributes, children, element) => <div className='row'       { ...attributes }>{ children }</div>);
Register('column', render_column);

Register('h1', render_h1);
Register('h2', render_h2);
Register('h3', render_h3);
Register('h4', render_h4);

Register('hr', () => <hr/>);

Register('image', render_image);

Register('p', render_p);

Register('ol', (attributes, children, element) => <ol { ...attributes }>{ children }</ol>);
Register('ul', (attributes, children, element) => <ul { ...attributes }>{ children }</ul>);
Register('li', (attributes, children, element) => <li { ...attributes }>{ children }</li>);

Register('select', render_select);

Register('table', (attributes, children, element) => <table className='table table-bordered' { ...attributes }>{ children }</table>);
Register('thead', (attributes, children, element) => <thead { ...attributes }>{ children }</thead>);
Register('tbody', (attributes, children, element) => <tbody { ...attributes }>{ children }</tbody>);

Register('tr', (attributes, children, element) => <tr { ...attributes }>{ children }</tr>);
Register('th', render_th);
Register('td', render_td);

// Register('constant',  (attributes, children, element) => <span { ...attributes }>{ children }</span>);

function Element({ attributes, children, element })
{
  const reference = useRef();

  const implement = Element.Type[element.type];

  return implement ? implement(attributes, children, element, reference) : <span ref={ reference } { ...attributes }>{ children }</span>;
}


export default Element;

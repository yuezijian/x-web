import React from 'react';


Element.Type = {};

function Register(type, implement)
{
  Element.Type[type] = implement;
}

Register('h1', (attributes, children) => <h1 { ...attributes }>{ children }</h1>);
Register('h2', (attributes, children) => <h2 { ...attributes }>{ children }</h2>);
Register('ol', (attributes, children) => <ol { ...attributes }>{ children }</ol>);
Register('ul', (attributes, children) => <ul { ...attributes }>{ children }</ul>);
Register('li', (attributes, children) => <li { ...attributes }>{ children }</li>);


function Element({ attributes, children, element })
{
  const implement = Element.Type[element.type];

  return implement ? implement(attributes, children) : <p { ...attributes }>{ children }</p>;
}


export default Element;

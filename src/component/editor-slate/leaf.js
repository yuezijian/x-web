import React from 'react';


function Leaf({ attributes, children, leaf })
{
  if (leaf.bold)
  {
    children = <strong>{ children }</strong>
  }

  if (leaf.italic)
  {
    children = <i>{ children }</i>
  }

  if (leaf.underline)
  {
    children = <u>{ children }</u>
  }

  if (leaf.color)
  {
    children = <span style={ { color: leaf.color } }>{ children }</span>
  }

  return <span { ...attributes }>{ children }</span>
}


export default Leaf;

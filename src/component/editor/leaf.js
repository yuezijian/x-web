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

  return <span { ...attributes }>{ children }</span>
}


export default Leaf;

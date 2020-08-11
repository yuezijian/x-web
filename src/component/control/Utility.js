function utility(props)
{
  let style = '';

  style += props.color  ? ` bg-${ props.color  }` : '';
  style += props.layout ? `    ${ props.layout }` : '';

  return style;
}


export default utility;

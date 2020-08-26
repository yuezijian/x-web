function utility(props)
{
  let style = '';

  style += props.color  ? ` bg-${ props.color  }` : '';

  const { margin, padding } = props;

  if (margin)
  {
    if (typeof margin === 'number')
    {
      style += ` m-${ margin }`;
    }
    else
    {
      if (margin.x     ) style += ` mx-${ margin.x      }`;
      if (margin.y     ) style += ` my-${ margin.y      }`;
      if (margin.left  ) style += ` ml-${ margin.left   }`;
      if (margin.right ) style += ` mr-${ margin.right  }`;
      if (margin.bottom) style += ` mb-${ margin.bottom }`;
      if (margin.top   ) style += ` mt-${ margin.top    }`;
    }
  }

  if (padding)
  {
    if (typeof padding === 'number')
    {
      style += ` p-${ padding }`;
    }
    else
    {
      if (padding.x     ) style += ` px-${ padding.x      }`;
      if (padding.y     ) style += ` py-${ padding.y      }`;
      if (padding.left  ) style += ` pl-${ padding.left   }`;
      if (padding.right ) style += ` pr-${ padding.right  }`;
      if (padding.bottom) style += ` pb-${ padding.bottom }`;
      if (padding.top   ) style += ` pt-${ padding.top    }`;
    }
  }

  return style;
}


export default utility;

import React from 'react';


function Collapse({ id, children, ...props })
{
  const element =

    <div className='accordion' id={ id }>
      {
        children
      }
    </div>
  ;

  return element;
}

Collapse.Card = function ({ parent, id, head, body, ...props})
{
  const element =

    <div className='card'>
      <div className='card-header' id={ `heading-${ id }` }>
        <h2 className='mb-0'>
          <
            button
            className     = 'btn btn-block text-left'
            type          = 'button'
            data-toggle   = 'collapse'
            aria-expanded = 'false'
            aria-controls = { `collapse-${ id }` }
            data-target   = { `#collapse-${ id }` }
          >
            {
              head
            }
          </button>
        </h2>
      </div>
      <
        div
        className       = 'collapse'
        id              = { `collapse-${ id }` }
        aria-labelledby = { `heading-${ id }` }
        data-parent     = { `#${ parent }`}
      >
        <div className='card-body'>
          {
            body
          }
        </div>
      </div>
    </div>
  ;

  return element;
};


export default Collapse;

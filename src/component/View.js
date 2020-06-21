import React from 'react'

import D3SVG from './D3SVG';

import XQuery from './XQuery';

import temp from './x-data/temp';

import scene from './x-data/scene';


function View()
{
  const element =

    <D3SVG width={ 1200 } height={ 800 } scene={ scene } data={ temp.data }/>
  ;

  return element;
}


export default View;

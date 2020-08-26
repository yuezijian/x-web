import React from 'react';

import { ReactComponent as Bold      } from 'bootstrap-icons/icons/type-bold.svg';
import { ReactComponent as Italic    } from 'bootstrap-icons/icons/type-italic.svg';
import { ReactComponent as Underline } from 'bootstrap-icons/icons/type-underline.svg';

import { ReactComponent as H1 } from 'bootstrap-icons/icons/type-h1.svg';
import { ReactComponent as H2 } from 'bootstrap-icons/icons/type-h2.svg';

import { ReactComponent as ListCheck     } from 'bootstrap-icons/icons/list-check.svg';
import { ReactComponent as ListOrdered   } from 'bootstrap-icons/icons/list-ol.svg';
import { ReactComponent as ListUnordered } from 'bootstrap-icons/icons/list-ul.svg';

import { ReactComponent as Image } from 'bootstrap-icons/icons/image.svg';
import { ReactComponent as Table } from 'bootstrap-icons/icons/table.svg';

import { ReactComponent as Brush   } from 'bootstrap-icons/icons/brush.svg';
import { ReactComponent as Printer } from 'bootstrap-icons/icons/printer.svg';

import { ReactComponent as ToggleOn  } from 'bootstrap-icons/icons/toggle-on.svg';
import { ReactComponent as ToggleOff } from 'bootstrap-icons/icons/toggle-off.svg';


function Icon()
{
  return <div>Icon</div>;
}

Icon.Bold      = props => <Bold      { ...props }/>;
Icon.Italic    = props => <Italic    { ...props }/>;
Icon.Underline = props => <Underline { ...props }/>;

Icon.H1 = props => <H1 { ...props }/>;
Icon.H2 = props => <H2 { ...props }/>;

Icon.ListCheck     = props => <ListCheck     { ...props }/>;
Icon.ListOrdered   = props => <ListOrdered   { ...props }/>;
Icon.ListUnordered = props => <ListUnordered { ...props }/>;

Icon.Image = props => <Image { ...props }/>;
Icon.Table = props => <Table { ...props }/>;

Icon.Brush   = props => <Brush   { ...props }/>;
Icon.Printer = props => <Printer { ...props }/>;

Icon.ToggleOn  = props => <ToggleOn  { ...props }/>;
Icon.ToggleOff = props => <ToggleOff { ...props }/>;


export default Icon;

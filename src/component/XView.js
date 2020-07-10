import React, { useState } from 'react';

import Grid from './layout/Grid';


function XView(props)
{
  const element =

    <Grid.Row>
      <Grid.Column>

        <p>
          在平台中创建了【科室】、【医生】数据对象，并做了关联。
        </p>

        <p>
          期望在这里展示出来
        </p>

        <p>
          任务：展示所有医生
        </p>

        <p>
          最终在两者之间沟通的是 graphql，
        </p>

      </Grid.Column>
    </Grid.Row>
  ;

  return element;
}


export default XView;

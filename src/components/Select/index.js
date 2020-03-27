import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';

import { ContainerSelect, SelectUI } from './styles';

export default function Select(props) {
  return (
    <ContainerSelect variant="outlined">
      <InputLabel id="outlined-label">{props.label}</InputLabel>
      <SelectUI labelId="outlined-label" label={props.label} {...props}>
        {props.children}
      </SelectUI>
    </ContainerSelect>
  );
}

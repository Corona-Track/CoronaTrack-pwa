import React, { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';

import { Container, SelectUI } from './styles';

export default function Select({ label, children }) {
  const [selected, setSelected] = useState('');

  return (
    <Container variant="outlined">
      <InputLabel id="outlined-label">{label}</InputLabel>
      <SelectUI
        labelId="outlined-label"
        value={selected}
        label={label}
        onChange={event => setSelected(event.target.value)}
      >
        {children}
      </SelectUI>
    </Container>
  );
}

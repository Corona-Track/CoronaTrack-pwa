import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import { Container } from './styles';

export default function Loading(props) {
  return (
    <Container {...props}>
      <CircularProgress color="inherit" />
    </Container>
  );
}

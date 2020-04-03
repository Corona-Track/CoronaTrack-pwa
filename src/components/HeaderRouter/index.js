import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { Container, H1 } from './style';

export default function HeaderRouter({ title, onClick }) {
  return (
    <Container onClick={onClick}>
      <MdArrowBack size="32px" />
      <H1>{title}</H1>
    </Container>
  );
}

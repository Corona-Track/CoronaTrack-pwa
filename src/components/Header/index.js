import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import { Container, H1 } from './styles';

export default function Header({ title, onClick }) {
  return (
    <Container onClick={onClick}>
      <MdArrowBack size="32px" />
      <H1>{title}</H1>
    </Container>
  );
}

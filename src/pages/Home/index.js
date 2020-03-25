import React from 'react';
import { useHistory } from 'react-router-dom';

// Assets
import logo from '../../assets/images/logo.png';

import { signOut } from '../../actions/AuthActions';
// Styles
import { Container, Image, P } from './styles';

export default function Home() {
  const history = useHistory();

  function signOute() {
    signOut();
    history.push('/login');
  }
  return (
    <Container>
      <Image src={logo} alt="Logo" />
      <h1>Home</h1>
      <P onClick={() => signOute()}>Sair</P>
    </Container>
  );
}

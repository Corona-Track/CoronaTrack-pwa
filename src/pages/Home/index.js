import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Layout from '../layout';

// Actions
import { verifySteps } from '../../actions/DegreeRiskActions';

// Assets
import logo from '../../assets/images/logo.png';

import { signOut } from '../../actions/AuthActions';
// Styles
import { Container, Image, P } from './styles';

export default function Home() {
  const history = useHistory();
  const Dispatch = useDispatch();

  function signOute() {
    signOut();
    history.push('/login');
  }
  useEffect(() => {
    const uid = localStorage.getItem('Uid');
    if (uid) {
      Dispatch(verifySteps(uid, history));
    }
  }, []);

  return (
    <Layout>
      <Container>
        <Image src={logo} alt="Logo" />
        <h1>Home</h1>
        <P onClick={() => signOute()}>Sair</P>
      </Container>
    </Layout>
  );
}

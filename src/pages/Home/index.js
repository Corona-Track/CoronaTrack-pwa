import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
<<<<<<< HEAD
import Iframe from 'react-iframe';
=======
import Layout from '../layout';
>>>>>>> a8ff0dbd524b2bcc0deebf303c631f71b000faa0

// Actions
import { verifySteps, symptEval } from '../../actions/DegreeRiskActions';
// import { signOut } from '../../actions/AuthActions';

// Assets
// import logo from '../../assets/images/logo.png';

// Styles
import { Container } from './styles';

export default function Home() {
  const history = useHistory();
  const Dispatch = useDispatch();

  // function signOute() {
  //   signOut();
  //   history.push('/login');
  // }
  const uid = localStorage.getItem('Uid');

  function CalcsymptEval() {
    Dispatch(symptEval(uid));
  }

  useEffect(() => {
    if (uid) {
      Dispatch(verifySteps(uid, history));
    }
  }, []);

  return (
<<<<<<< HEAD
    <Container>
      {/* <Image src={logo} alt="Logo" />
      <h1>Home</h1>
      <P onClick={() => signOute()}>Sair</P> */}
      <div>
        <h1 onClick={() => CalcsymptEval()}>Calcular</h1>
      </div>
      <Iframe
        url="http://site58987541.westus2.cloudapp.azure.com:81/epidemia/Grafico/Map?modulo=Geociencia&acesso_publico=S&acesso_mobile=S"
        width="100%"
        height="100%"
      />
    </Container>
=======
    <Layout>
      <Container>
        <Image src={logo} alt="Logo" />
        <h1>Home</h1>
        <P onClick={() => signOute()}>Sair</P>
      </Container>
    </Layout>
>>>>>>> a8ff0dbd524b2bcc0deebf303c631f71b000faa0
  );
}

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FiShare2 } from 'react-icons/fi';

import Iframe from 'react-iframe';

// Components
import Share from '../../components/Share';
import Button from '../../components/Button';
import Header from '../../components/Header';

// Actions
import { verifySteps } from '../../actions/DegreeRiskActions';

// Styles
import { Container, ShareContainer } from './styles';

export default function Home() {
  const history = useHistory();
  const Dispatch = useDispatch();

  const [shareActive, setShareActive] = useState(false);

  const uid = localStorage.getItem('Uid');

  // function CalcsymptEval() {
  //   Dispatch(symptEval(uid));
  // }

  function handleShare() {
    setShareActive(!shareActive);
  }

  useEffect(() => {
    if (uid) {
      Dispatch(verifySteps(uid, history));
    }
  }, []);

  return (
    <>
      <Container>
        <Header />
        <Share active={shareActive} onClose={handleShare} />
        <Iframe
          url="http://site58987541.westus2.cloudapp.azure.com:81/epidemia/Grafico/Map?modulo=Geociencia&acesso_publico=S&acesso_mobile=S"
          width="100%"
          height="100%"
        />
        <ShareContainer>
          <Button
            variant="contained"
            theme="segundary"
            endIcon={<FiShare2 />}
            onClick={() => handleShare()}
          >
            Compartilhar
          </Button>
        </ShareContainer>
      </Container>
    </>
  );
}

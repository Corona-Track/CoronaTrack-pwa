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
import { setPosition } from '../../actions/AuthActions';

// Styles
import { Container, ShareContainer } from './styles';

export default function Home() {
  const history = useHistory();
  const Dispatch = useDispatch();

  const [shareActive, setShareActive] = useState(false);
  const [coord, setCoord] = useState({});

  const uid = localStorage.getItem('Uid');

  // function CalcsymptEval() {
  //   Dispatch(symptEval(uid));
  // }

  function handleShare() {
    setShareActive(!shareActive);
  }

  useEffect(() => {
    // if (uid) {
    //   Dispatch(getPosition(uid)).then(res => {
    //     setCoord(res);
    //   });
    // }
    // Pedi permisão de acessar a localização

    function getPosition() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            const coords = {
              latitude,
              longitude,
            };
            setCoord(coords);
            Dispatch(setPosition(uid, coords));
          }
        );
      } else {
        alert('Precisamos da sua localização para melhor funcionamento do app');
        setCoord({
          latitude: 0,
          longitude: 0,
        });
        getPosition();
      }
    }
    getPosition();
  }, []);

  return (
    <>
      <Container>
        <Header />
        <Share active={shareActive} onClose={handleShare} />

        <Iframe
          url={`https://mapa.comunicabeach.com.br/epidemia/Grafico/Map?modulo=Geociencia&acesso_publico=S&acesso_mobile=S&integracao=S&latitude=${coord.latitude}&longitude=${coord.longitude}&zoom=14&uid=${uid}`}
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

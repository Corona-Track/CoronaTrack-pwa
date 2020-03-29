import React from 'react';
import { useHistory } from 'react-router-dom';

// Assets
import sintomas from '../../assets/images/sintomas.png';

import Button from '../../components/Button';

// Styles
import { Container, Image } from './styles';

export default function Symptoms() {
  // const history = useHistory();

  return (
    <Container>
      <p className="title">Histórico de Contato</p>
      <Image src={sintomas} alt="Sintomas" />
      <p>
        Você teve contato próximo com caso <strong>suspeito</strong> de
        Coronavírus?
      </p>
      <Button variant="contained" theme="segundary">
        Não
      </Button>
      <Button variant="contained" theme="segundary">
        Sim
      </Button>
    </Container>
  );
}

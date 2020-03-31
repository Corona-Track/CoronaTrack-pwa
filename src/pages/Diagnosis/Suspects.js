import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

// Actions
import { AddInDb, verifySteps } from '../../actions/DegreeRiskActions';

// Assets
import ContactSuspects from '../../assets/images/ContactSuspects.png';

// Components
import Button from '../../components/Button';
import Loading from '../../components/Loading';

// Styles
import { Container, Content, Image, ButtonOption } from './styles';

export default function Suspects() {
  const history = useHistory();
  const Dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const uid = localStorage.getItem('Uid');

  async function addSintomas(value) {
    setLoading(true);
    if (uid) {
      Dispatch(AddInDb(uid, { contactWithSuspect: value })).then(() => {
        Dispatch(verifySteps(uid, history));
      });
    }
  }
  useEffect(() => {
    if (uid) {
      Dispatch(verifySteps(uid, history));
    }
  });

  return (
    <Container>
      <Loading open={loading} />
      <Content>
        <p className="title">Histórico de Contato</p>
        <Image src={ContactSuspects} alt="Contato com supeitos" />
        <p className="description">
          Você teve contato próximo com caso <strong>suspeito</strong> de
          Coronavírus?
        </p>
        <Button
          variant="contained"
          theme="segundary"
          background="#EB5757"
          onClick={() => addSintomas(0)}
        >
          Não
        </Button>
        <Button
          variant="contained"
          theme="segundary"
          background="#27AE60"
          onClick={() => addSintomas(1)}
        >
          Sim
        </Button>

        <ButtonOption
          type="button"
          onClick={() => addSintomas('Não tenho certeza')}
        >
          Não tenho certeza.
        </ButtonOption>
      </Content>
    </Container>
  );
}

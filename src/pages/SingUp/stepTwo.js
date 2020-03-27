import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdArrowForward, MdMyLocation } from 'react-icons/md';
import MenuItem from '@material-ui/core/MenuItem';

// Components
import Header from '../../components/Header';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

// Styles
import { Container, Content, Error } from './styles';

export default function Home() {
  const history = useHistory();

  const [formState, setFormState] = useState({
    email: '',
    password: '',
    name: '',
    cpf: '',
    dateBirth: '',
    sexo: '',
    riskGroup: '',
    phone: '',
    zipCode: '',
    street: '',
    neighborhood: '',
    city: '',
    uf: '',
  });

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [step, setStep] = useState(0);

  const [error, setError] = useState({
    zipCode: false,
    street: false,
    neighborhood: false,
    city: false,
    uf: false,
  });

  function setState(event, state) {
    const {
      target: { value },
    } = event;

    setFormState({
      ...formState,
      [state]: value,
    });
  }

  function nextStep() {
    const isEmpty = Object.entries(formState).find(element => {
      if (element[1] === '') {
        return element[0];
      }
    });
    if (isEmpty[0]) {
      setError({
        ...error,
        [isEmpty[0]]: true,
      });
    } else {
      window.scrollTo(0, 0);
      setStep(1);
    }
  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => {
        console.log(res);
      });
    }
  }
  function onBlurState(el) {
    if (formState[el] === '') {
      setError({
        ...error,
        [el]: true,
      });
    } else {
      setError({
        ...error,
        [el]: false,
      });
    }
  }

  return (
    <Container>
      <Loading open={loading} />
      <Content>
        <Header title="Criar Conta" onClick={() => setStep(0)} />
        <p className="description">Dados de Endereço</p>

        <Button
          variant="contained"
          theme="segundary"
          startIcon={<MdMyLocation />}
          onClick={() => getLocation()}
        >
          Minha localização
        </Button>

        <Input
          required
          label="Data de Nascimento"
          value={formState.dateBirth}
          variant="outlined"
          onChange={event => setState(event, 'dateBirth')}
        />
        <Input
          required
          label="Data de Nascimento"
          value={formState.dateBirth}
          variant="outlined"
          onChange={event => setState(event, 'dateBirth')}
        />

        <Input
          required
          label="Celular"
          value={formState.phone}
          variant="outlined"
          onChange={event => setState(event, 'phone')}
        />
        <Input
          required
          label="E-mail"
          value={formState.email}
          variant="outlined"
          onChange={event => setState(event, 'email')}
        />

        <Input
          variant="outlined"
          label="Password"
          value={formState.password}
          onChange={event => setState(event, 'password')}
        />

        <Button
          variant="contained"
          theme="primary"
          endIcon={<MdArrowForward />}
        >
          Proximo
        </Button>
      </Content>
    </Container>
  );
}

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// import Geocode from 'react-geocode';

import { useHistory } from 'react-router-dom';
import { MdArrowForward, MdMyLocation } from 'react-icons/md';
import { createNewUser } from '../../actions/AuthActions';

// Components
import Header from '../../components/Header';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

// Styles
import { Container, Content, Error } from './styles';

export default function Home() {
  const history = useHistory();
  const Dispatch = useDispatch();

  const [formState, setFormState] = useState({
    zipCode: '',
    street: '',
    neighborhood: '',
    city: '',
    uf: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [error, setError] = useState({
    zipCode: false,
    street: false,
    neighborhood: false,
    city: false,
    uf: false,
    email: false,
    password: false,
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
    }
  }
  function getLocation() {
    if (navigator.geolocation) {
      // navigator.geolocation.getCurrentPosition(
      //   ({ coords: { latitude, longitude } }) => {
      //     Geocode.setApiKey('AIzaSyDNzvzwsgC-lNG2Wsesd2bqTOHvccr8Tqo');
      //     Geocode.setLanguage('pt-br');
      //     Geocode.fromLatLng(latitude, longitude).then(
      //       response => {
      //         const address = response.results[0].formatted_address;
      //         console.log(address);
      //       },
      //       error => {
      //         console.error(error);
      //       }
      //     );
      //   }
      // );
      return true;
    }
    alert('Precisamos da sua localização para o app funcionar da forma certa!');
    return false;
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

  function validateEmail() {
    const { email } = formState;
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const validate = re.test(String(email).toLowerCase());

    if (email !== '' && !validate) {
      setError({
        ...error,
        email: true,
      });
    } else {
      setError({
        ...error,
        email: false,
      });
    }
  }

  function completeCep() {
    const { zipCode } = formState;
    axios
      .get(`https://viacep.com.br/ws/${zipCode}/json/`)
      .then(({ data }) => {
        setFormState({
          ...formState,
          street: data.logradouro,
          neighborhood: data.bairro,
          city: data.localidade,
          uf: data.uf,
        });
        setError({
          ...error,
          zipCode: false,
        });
      })
      .catch(() => {
        setError({
          ...error,
          zipCode: true,
        });
      });
  }

  function validatePassword() {
    const { password } = formState;
    if (password < 6) {
      setError({
        ...error,
        password: true,
      });
      return true;
    }
    setError({
      ...error,
      password: false,
    });
    return false;
  }

  function createUser() {
    const isEmpty = Object.entries(formState).find(element => {
      if (element[1] === '') {
        return element;
      }
    });

    if (isEmpty) {
      setError({
        ...error,
        [isEmpty[0]]: true,
      });
    } else {
      Dispatch(createNewUser(formState.email, formState.password, formState))
        .then(() => {
          setLoading(true);
          history.push('/');
        })
        .catch(error => {
          setErrorMessage(error.message);
          setLoading(false);
        });
    }
  }

  return (
    <Container>
      <Loading open={loading} />
      <Content>
        <Header title="Criar Conta" onClick={() => history.goBack()} />
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
          label="CEP"
          value={formState.zipCode}
          error={error.zipCode}
          variant="outlined"
          onChange={event => setState(event, 'zipCode')}
          onBlur={() => completeCep()}
        />
        <Input
          required
          label="Rua"
          value={formState.street}
          error={error.street}
          variant="outlined"
          onChange={event => setState(event, 'dateBirth')}
        />

        <Input
          required
          label="Bairro"
          value={formState.neighborhood}
          error={error.neighborhood}
          variant="outlined"
          onChange={event => setState(event, 'phone')}
        />
        <Input
          required
          label="Cidade"
          value={formState.city}
          error={error.city}
          variant="outlined"
          onChange={event => setState(event, 'email')}
        />

        <Input
          label="UF"
          value={formState.uf}
          error={error.uf}
          variant="outlined"
          onChange={event => setState(event, 'uf')}
        />
        <Input
          required
          label="E-mail"
          error={error.email}
          value={formState.email}
          variant="outlined"
          onChange={event => setState(event, 'email')}
          helperText={error.email && 'Digite um e-mail valido!'}
          onBlur={() => validateEmail('blur')}
          onFocus={() => validateEmail()}
        />

        <Input
          variant="outlined"
          label="Password"
          value={formState.password}
          error={error.password}
          helperText="Digite uma senha com mais de 6 caracteres"
          onChange={event => setState(event, 'password')}
          onBlur={() => validatePassword('blur')}
        />

        {errorMessage !== '' && <Error>{errorMessage}</Error>}

        <Button
          variant="contained"
          theme="primary"
          endIcon={<MdArrowForward />}
          onClick={() => createUser()}
        >
          Proximo
        </Button>
      </Content>
    </Container>
  );
}

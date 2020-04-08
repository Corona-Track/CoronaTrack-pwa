import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// import Geocode from 'react-geocode';

import { useHistory } from 'react-router-dom';
import { MdArrowForward, MdMyLocation } from 'react-icons/md';
import { createNewUser, setPosition } from '../../actions/AuthActions';

// Components
import HeaderRouter from '../../components/HeaderRouter';
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
  const [isFacebook] = useState(localStorage.getItem('loginType') || false);

  const [location, setLocation] = useState('');

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

  function getLocation() {
    // Pedi permisão de acessar a localização
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          const coords = {
            latitude,
            longitude,
          };
          setLocation(coords);
          alert('Dados gravados com sucesso!');
        }
      );
    } else {
      alert('Precisamos da sua localização para melhor funcionamento do app');
      setLocation('');
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
    const infosTemp = localStorage.getItem('infosTemp') || '{}';

    const isEmpty = Object.entries(formState).find(element => {
      if (element[1] === '') {
        return element;
      }
      return false;
    });

    if (isEmpty) {
      setError({
        ...error,
        [isEmpty[0]]: true,
      });
    } else if (location === '') {
      setErrorMessage(
        'Precisamos da sua localização para o app funcionar da forma certa!'
      );
    } else {
      setLoading(true);
      const newForm = {
        ...JSON.parse(infosTemp),
        ...formState,
      };
      Dispatch(createNewUser(formState.email, formState.password, newForm))
        .then(({ uid }) => {
          Dispatch(setPosition(uid, location))
            .then(() => {
              setLoading(false);
              history.push('/diagnostico/suspeitos');
            })
            .catch(() => {
              setLoading(false);
            });
        })
        .catch(error => {
          setErrorMessage(error.message);
          setLoading(false);
        });
    }
  }

  useEffect(() => {
    const newFormState = formState;
    delete newFormState.email;
    delete newFormState.password;
    setFormState(newFormState);
  }, [isFacebook]);

  return (
    <Container>
      <Loading open={loading} />
      <Content>
        <HeaderRouter title="Criar Conta" onClick={() => history.goBack()} />
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
          value={formState.zipCode || ''}
          error={error.zipCode}
          variant="outlined"
          onChange={event => setState(event, 'zipCode')}
          onBlur={() => completeCep()}
        />
        <Input
          required
          label="Rua"
          value={formState.street || ''}
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
          onChange={event => setState(event, 'city')}
        />

        <Input
          label="UF"
          value={formState.uf}
          error={error.uf}
          variant="outlined"
          onChange={event => setState(event, 'uf')}
        />
        {!isFacebook && (
          <>
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
          </>
        )}
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

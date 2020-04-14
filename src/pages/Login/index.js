import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaFacebookSquare } from 'react-icons/fa';

// Components
import Button from '../../components/Button';
import Input from '../../components/Input';
import Loading from '../../components/Loading';

// Actions
import { SignInAction, loginWithFacebook } from '../../actions/AuthActions';

// Assets
import logo from '../../assets/images/logo.svg';

// Styles
import { Container, Image, Content, Error, Line } from './styles';

export default function Home() {
  const Dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function clearAll() {
    setEmail('');
    setPassword('');
    setErrorMessage('');
  }

  function validateForm(status, error) {
    if (status) {
      clearAll();
      setLoading(false);
      history.push('/');
    } else {
      setErrorMessage(error.message);
      setPassword('');
      setLoading(false);
    }
  }

  function login() {
    setLoading(true);
    Dispatch(SignInAction(email, password))
      .then(() => {
        validateForm(true);
      })
      .catch(error => {
        validateForm(false, error);
      });
  }

  function loginFacebook() {
    setLoading(true);
    Dispatch(loginWithFacebook(email, password))
      .then(() => {
        clearAll();
        setLoading(false);
        history.push('/diagnostico/suspeitos');
      })
      .catch(error => {
        setErrorMessage(error.message);
        setPassword('');
        setLoading(false);
      });
  }

  useEffect(() => {
    const loginType = localStorage.getItem('loginType') || null;
    if (loginType) {
      return history.push('/signUp');
    }
  }, [history]);

  return (
    <Container>
      <Loading open={loading} />
      <Image src={logo} alt="Logo" />
      <Content>
        <Input
          required
          label="E-mail"
          value={email}
          variant="outlined"
          onChange={({ target: { value } }) => setEmail(value)}
        />
        <Input
          variant="outlined"
          label="Password"
          value={password}
          onChange={({ target: { value } }) => setPassword(value)}
        />

        {errorMessage !== '' && <Error>{errorMessage}</Error>}

        <Button variant="contained" theme="primary" onClick={() => login()}>
          Entrar
        </Button>

        <Line>
          <hr />
          <p>ou</p>
          <hr />
        </Line>

        <Button
          variant="contained"
          theme="segundary"
          background="#235DE3"
          onClick={() => loginFacebook()}
          startIcon={<FaFacebookSquare />}
        >
          Entrar com Facebook
        </Button>

        <Button
          variant="contained"
          theme="segundary"
          onClick={() => history.push('/signUp')}
        >
          Cadastre-se
        </Button>
      </Content>
    </Container>
  );
}

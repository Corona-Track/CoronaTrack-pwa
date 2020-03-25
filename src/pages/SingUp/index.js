import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Button from '@material-ui/core/Button';
import Input from '../../components/Input';

// Actions
import { createNewUser } from '../../actions/AuthActions';

// Assets
import logo from '../../assets/images/logo.png';

// Styles
import { Container, Image, Content, Error } from './styles';

export default function Home() {
  const { errorMessage } = useSelector(state => state.auth);

  const Dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpf, setCpf] = useState('');

  function signUp() {
    Dispatch(createNewUser(email, password, cpf))
      .then(() => {
        setCpf('');
        setEmail('');
        setPassword('');
      })
      .catch(() => {
        setPassword('');
      });
  }
  return (
    <Container>
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

        <Input
          required
          label="CPF"
          value={cpf}
          variant="outlined"
          onChange={({ target: { value } }) => setCpf(value)}
        />
        {errorMessage !== '' && <Error>{errorMessage}</Error>}

        <Button variant="contained" color="secondary" onClick={() => signUp()}>
          Cadastrar
        </Button>
      </Content>
    </Container>
  );
}

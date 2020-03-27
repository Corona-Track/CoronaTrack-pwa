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
    cpf: false,
    dateBirth: false,
    email: false,
    phone: false,
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
  function isError() {
    const el = Object.entries(error).find(element => element[1] === true);
    if (el) {
      return true;
    }
    return false;
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

  function nextStep() {
    Object.entries(formState).forEach(item => {
      if (item[1] === '' || isError() || !validatePassword()) {
        setErrorMessage('Por Favor preencha todos os campos!');
      } else {
        window.scrollTo(0, 0);
      }
    });
    // setStep(1);
  }
  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(res => {
        console.log(res);
      });
    }
  }

  function validateCpf(type) {
    if (type === 'blur') {
      const { cpf } = formState;
      setFormState({
        ...formState,
        cpf: cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4'),
      });

      if (cpf.length > 11 || cpf.length < 11) {
        setError({
          ...error,
          cpf: true,
        });
      } else {
        setError({
          ...error,
          cpf: false,
        });
      }
    } else {
      setFormState({
        ...formState,
        cpf: formState.cpf.replace(/[.-]/g, ''),
      });
    }
  }
  function validateDateBirth(type) {
    const { dateBirth } = formState;
    if (type === 'blur') {
      setFormState({
        ...formState,
        dateBirth: dateBirth.replace(/(\d{2})?(\d{2})?(\d{4})/, '$1/$2/$3'),
      });

      if (dateBirth.length > 8 || dateBirth.length < 8) {
        setError({
          ...error,
          dateBirth: true,
        });
      } else {
        setError({
          ...error,
          dateBirth: false,
        });
      }
    } else {
      setFormState({
        ...formState,
        dateBirth: dateBirth.replace(/[/]/g, ''),
      });
    }
  }

  function validatePhone(type) {
    const { phone } = formState;
    if (type === 'blur') {
      setFormState({
        ...formState,
        phone: phone.replace(/(\d{2})?(\d{4})?(\d{5})/, '($1) $2-$3'),
      });

      if (phone.length < 10) {
        setError({
          ...error,
          phone: true,
        });
      } else {
        setError({
          ...error,
          phone: false,
        });
      }
    } else {
      setFormState({
        ...formState,
        phone: phone.replace(/[()-\s/]/g, ''),
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

  function submit() {
    console.log('jonas');
  }

  return (
    <Container>
      <Loading open={loading} />
      <Content>
        {step === 0 ? (
          <>
            <Header title="Criar Conta" onClick={() => history.goBack()} />
            <p className="description">Dados Pessoais</p>
            <Input
              required
              label="CPF"
              value={formState.cpf}
              variant="outlined"
              error={error.cpf}
              onChange={event => setState(event, 'cpf')}
              onBlur={() => validateCpf('blur')}
              onFocus={() => validateCpf()}
            />
            <Input
              required
              label="Nome Completo"
              value={formState.name}
              variant="outlined"
              onChange={event => setState(event, 'name')}
            />
            <Input
              required
              label="Data de Nascimento"
              value={formState.dateBirth}
              error={error.dateBirth}
              variant="outlined"
              onChange={event => setState(event, 'dateBirth')}
              onBlur={() => validateDateBirth('blur')}
              onFocus={() => validateDateBirth()}
            />

            <Select label="Sexo" onChange={event => setState(event, 'sexo')}>
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Masculino">Feminino</MenuItem>
            </Select>

            <Select label="Grupo de Risco">
              <MenuItem value="Não">Não</MenuItem>
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Masculino">Feminino</MenuItem>
            </Select>

            <Input
              required
              label="Celular"
              value={formState.phone}
              variant="outlined"
              error={error.phone}
              onChange={event => setState(event, 'phone')}
              onBlur={() => validatePhone('blur')}
              onFocus={() => validatePhone()}
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
              onFocus={() => validateEmail()}
            />

            {errorMessage !== '' && <Error>{errorMessage}</Error>}
            <Button
              variant="contained"
              theme="primary"
              endIcon={<MdArrowForward />}
              onClick={() => nextStep()}
            >
              Proximo
            </Button>
          </>
        ) : (
          <>
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
              onClick={() => submit()}
            >
              Proximo
            </Button>
          </>
        )}
      </Content>
    </Container>
  );
}

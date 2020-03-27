import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { MdArrowForward } from 'react-icons/md';
import MenuItem from '@material-ui/core/MenuItem';

// Components
import Header from '../../components/Header';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

// Styles
import { Container, Content, Error } from './styles';

// Actions
import { createNewUser } from '../../actions/AuthActions';

export default function Home() {
  const Dispatch = useDispatch();
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
  });

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [error, setError] = useState({
    cpf: false,
    dateBirth: false,
    email: false,
    phone: false,
    password: false,
    name: false,
    sexo: false,
    riskGroup: false,
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
    const isEmpty = Object.entries(formState).find(element => {
      if (element[1] === '') {
        return element;
      }
    });

    if (isEmpty) {
      setError({
        ...error,
        [isEmpty]: true,
      });
    } else {
      setLoading(true);

      Dispatch(createNewUser(formState.email, formState.password, formState))
        .then(() => {
          setLoading(false);
          history.push('/signUp/nextStep');
        })
        .catch(error => {
          setErrorMessage(error.message);
          setLoading(false);
          window.scrollTo(0, 0);
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

  return (
    <Container>
      <Loading open={loading} />
      <Content>
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
          error={error.name}
          value={formState.name}
          variant="outlined"
          onChange={event => setState(event, 'name')}
          onBlur={() => onBlurState('name')}
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

        <Select
          error={error.sexo}
          label="Sexo"
          value={formState.sexo}
          onChange={event => setState(event, 'sexo')}
        >
          <MenuItem value="Masculino">Masculino</MenuItem>
          <MenuItem value="Masculino">Feminino</MenuItem>
        </Select>

        <Select
          label="Grupo de Risco"
          error={error.riskGroup}
          value={formState.riskGroup}
          onChange={event => setState(event, 'riskGroup')}
        >
          <MenuItem value="Não">Não</MenuItem>
          <MenuItem value="gravida">Gravida</MenuItem>
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
      </Content>
    </Container>
  );
}

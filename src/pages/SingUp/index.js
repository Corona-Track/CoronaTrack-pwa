import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { MdArrowForward } from 'react-icons/md';
import MenuItem from '@material-ui/core/MenuItem';

// Components
import HeaderRouter from '../../components/HeaderRouter';
import Input from '../../components/Input';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Loading from '../../components/Loading';

// Styles
import { Container, Content } from './styles';

export default function Home() {
  const history = useHistory();

  const [formState, setFormState] = useState({
    name: '',
    cpf: '',
    dateBirth: '',
    sexo: '',
    pregnant: ' ',
    phone: '',
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState({
    cpf: false,
    dateBirth: false,
    phone: false,
    name: false,
    sexo: false,
    pregnant: true,
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
        return element;
      }
      return false;
    });

    if (isEmpty) {
      setError({
        ...error,
        [isEmpty[0]]: true,
      });
    } else {
      setLoading(true);
      localStorage.setItem('infosTemp', JSON.stringify(formState));
      window.scrollTo(0, 0);
      history.push('/signUp/nextStep');
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
        cpf: cpf
          ? cpf.replace(/(\d{3})?(\d{3})?(\d{3})?(\d{2})/, '$1.$2.$3-$4')
          : cpf,
      });

      if (!cpf || cpf.length > 11 || cpf.length < 11) {
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
        cpf: formState.cpf ? formState.cpf.replace(/[.-]/g, '') : formState.cpf,
      });
    }
  }
  function validateDateBirth(type) {
    const { dateBirth } = formState;
    if (type === 'blur') {
      setFormState({
        ...formState,
        dateBirth: dateBirth
          ? dateBirth.replace(/(\d{2})?(\d{2})?(\d{4})/, '$1/$2/$3')
          : dateBirth,
      });

      if (!dateBirth || dateBirth.length > 8 || dateBirth.length < 8) {
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
        dateBirth: dateBirth ? dateBirth.replace(/[/]/g, '') : dateBirth,
      });
    }
  }

  function validatePhone(type) {
    const { phone } = formState;
    if (type === 'blur') {
      setFormState({
        ...formState,
        phone: phone
          ? phone.replace(/(\d{2})?(\d{4})?(\d{5})/, '($1) $2-$3')
          : phone,
      });

      if (!phone || phone.length < 10) {
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
        phone: phone ? phone.replace(/[()-\s/]/g, '') : phone,
      });
    }
  }

  return (
    <Container>
      <Loading open={loading} />
      <Content>
        <HeaderRouter title="Criar Conta" onClick={() => history.goBack()} />
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
          <MenuItem value="Feminino">Feminino</MenuItem>
        </Select>

        <Select
          label="Gestante"
          disabled={formState.sexo !== 'Feminino'}
          style={{ background: formState.sexo !== 'Feminino' ? '#e0e0e0' : '' }}
          error={error.pregnant || false}
          value={formState.pregnant || ''}
          onChange={event => setState(event, 'pregnant')}
        >
          <MenuItem value="Não">Não</MenuItem>
          <MenuItem value="Sim">Sim</MenuItem>
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

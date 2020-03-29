import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import { useStyles } from './styles';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

// Components
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';

export default function Symptoms({submitSymptons}) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    coriza: false,
    dorcabeca: false,
    tosse: false,
    dorgarganta: false,
    febre: false,
    malestargeral: false,
    dificuldaderespirar: false,
    diarreia: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const submitSymptoms = (state) => {
    submitSymptons(state)
  }

  const { 
    coriza,
    dorcabeca,
    tosse,
    dorgarganta,
    febre,
    malestargeral,
    dificuldaderespirar,
    diarreia
   } = state;

  return (
    <Fragment>
      <Container className={classes.symptoms}>
        <p className={classes.symptomsLabel}>SINTOMÁTICO</p>    
        <h1 className={classes.symptomsQuestion}>Você está sentindo algum dos sintomas abaixo?</h1>
        <FormControl component="fieldset" >
          <FormGroup className={classes.formControl}>
            <FormControlLabel
              control={<CheckBox checked={coriza} onChange={handleChange} name="coriza" />}
              label="Coriza"
            />
            <FormControlLabel
              control={<CheckBox checked={dorcabeca} onChange={handleChange} name="dorcabeca" />}
              label="Dor de Cabeça"
            />
            <FormControlLabel
              control={<CheckBox checked={tosse} onChange={handleChange} name="tosse" />}
              label="Tosse"
            />
              <FormControlLabel
              control={<CheckBox checked={dorgarganta} onChange={handleChange} name="dorgarganta" />}
              label="Dor de Garganta"
            />
            <FormControlLabel
              control={<CheckBox checked={febre} onChange={handleChange} name="febre" />}
              label="Febre"
            />
            <FormControlLabel
              control={<CheckBox checked={malestargeral} onChange={handleChange} name="malestargeral" />}
              label="Mal Estar Geral"
            />
            <FormControlLabel
              control={<CheckBox checked={dificuldaderespirar} onChange={handleChange} name="dificuldaderespirar" />}
              label="Dificuldade para Respirar"
            />
            <FormControlLabel
              control={<CheckBox checked={diarreia} onChange={handleChange} name="diarreia" />}
              label="Diarréia"
            />
          </FormGroup>
        </FormControl>
        <Button className={classes.symptomsBtn} variant="contained" theme="primary" onClick={() => submitSymptoms(state)}>
            Continuar
        </Button>
      </Container>
    </Fragment>
  );
};

Symptoms.displayName = 'Symptoms';

Symptoms.propTypes = {
  submitSymptons: PropTypes.func.isRequired
};

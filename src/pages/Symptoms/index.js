import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useStyles } from './styles';

// Actions
import { AddInDb, verifySteps } from '../../actions/DegreeRiskActions';

// Components
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';

export default function Symptoms() {
  const history = useHistory();
  const Dispatch = useDispatch();

  const classes = useStyles();
  const [state, setState] = React.useState({
    coriza: 0,
    dorcabeca: 0,
    tosse: 0,
    dorgarganta: 0,
    febre: 0,
    doresmusculares: 0,
    dificuldaderespirar: 0,
    diarreia: 0,
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked ? 1 : 0 });
  };

  const submitSymptoms = () => {
    const uid = localStorage.getItem('Uid');

    Dispatch(AddInDb(uid, state, '/Sintomas'))
      .then(() => {
        history.push('/resultado');
      })
      .catch(() => {
        submitSymptoms();
      });
  };

  const {
    coriza,
    dorcabeca,
    tosse,
    dorgarganta,
    febre,
    doresmusculares,
    dificuldaderespirar,
    diarreia,
  } = state;

  useEffect(() => {
    const uid = localStorage.getItem('Uid');
    if (uid) {
      Dispatch(verifySteps(uid, history));
    }
  }, []);

  return (
    <>
      <Container className={classes.symptoms}>
        <p className={classes.symptomsLabel}>SINTOMÁTICO</p>
        <h1 className={classes.symptomsQuestion}>
          Você está sentindo algum dos sintomas abaixo?
        </h1>
        <FormControl component="fieldset">
          <FormGroup className={classes.formControl}>
            <FormControlLabel
              control={
                <CheckBox
                  checked={coriza === 1}
                  onChange={handleChange}
                  name="coriza"
                />
              }
              label="Coriza"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={dorcabeca === 1}
                  onChange={handleChange}
                  name="dorcabeca"
                />
              }
              label="Dor de Cabeça"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={tosse === 1}
                  onChange={handleChange}
                  name="tosse"
                />
              }
              label="Tosse"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={dorgarganta === 1}
                  onChange={handleChange}
                  name="dorgarganta"
                />
              }
              label="Dor de Garganta"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={febre === 1}
                  onChange={handleChange}
                  name="febre"
                />
              }
              label="Febre"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={doresmusculares === 1}
                  onChange={handleChange}
                  name="doresmusculares"
                />
              }
              label="Dores Musculares"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={dificuldaderespirar === 1}
                  onChange={handleChange}
                  name="dificuldaderespirar"
                />
              }
              label="Dificuldade para Respirar"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={diarreia === 1}
                  onChange={handleChange}
                  name="diarreia"
                />
              }
              label="Diarréia"
            />
          </FormGroup>
        </FormControl>
        <Button
          className={classes.symptomsBtn}
          variant="contained"
          theme="primary"
          onClick={() => submitSymptoms()}
        >
          Continuar
        </Button>
      </Container>
    </>
  );
}

Symptoms.displayName = 'Symptoms';

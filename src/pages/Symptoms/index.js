import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useStyles, Container, ButtonOption } from './styles';

import Loading from '../../components/Loading';

// Actions
import { AddInDb } from '../../actions/DegreeRiskActions';

// Components
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';

export default function Symptoms() {
  const history = useHistory();
  const Dispatch = useDispatch();

  const classes = useStyles();
  const [state, setState] = useState({
    febre: 0,
    tosseSeca: 0,
    fadiga: 0,
    tosseComCatarro: 0,
    faltaDeAr: 0,
    dorDeGarganta: 0,
    dorDeCabeca: 0,
    dorNoCorpo: 0,
    calafrio: 0,
    nauseaOuVomito: 0,
    narizEntupido: 0,
    diarreia: 0,
    tosseComSangue: 0,
    olhosVermelhos: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked ? 1 : 0 });
  };

  const submitSymptoms = empty => {
    setLoading(true);
    const uid = localStorage.getItem('Uid');
    const stateReset = {
      febre: 0,
      tosseSeca: 0,
      fadiga: 0,
      tosseComCatarro: 0,
      faltaDeAr: 0,
      dorDeGarganta: 0,
      dorDeCabeca: 0,
      dorNoCorpo: 0,
      calafrio: 0,
      nauseaOuVomito: 0,
      narizEntupido: 0,
      diarreia: 0,
      tosseComSangue: 0,
      olhosVermelhos: 0,
    };
    const newState = empty ? stateReset : state;

    Dispatch(AddInDb(uid, newState, '/Sintomas'))
      .then(() => {
        history.push('/resultado');
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        submitSymptoms();
      });
  };

  const {
    febre,
    tosseSeca,
    fadiga,
    tosseComCatarro,
    faltaDeAr,
    dorDeGarganta,
    dorDeCabeca,
    dorNoCorpo,
    calafrio,
    nauseaOuVomito,
    narizEntupido,
    diarreia,
    tosseComSangue,
    olhosVermelhos,
  } = state;

  return (
    <>
      <Loading open={loading} />
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
                  checked={tosseSeca === 1}
                  onChange={handleChange}
                  name="tosseSeca"
                />
              }
              label="Tosse Seca"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={tosseComCatarro === 1}
                  onChange={handleChange}
                  name="tosseComCatarro"
                />
              }
              label="Tosse Com Catarro"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={fadiga === 1}
                  onChange={handleChange}
                  name="fadiga"
                />
              }
              label="Fadiga"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={faltaDeAr === 1}
                  onChange={handleChange}
                  name="faltaDeAr"
                />
              }
              label="Falta De Ar"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={dorDeGarganta === 1}
                  onChange={handleChange}
                  name="dorDeGarganta"
                />
              }
              label="Dor De Garganta"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={dorDeCabeca === 1}
                  onChange={handleChange}
                  name="dorDeCabeca"
                />
              }
              label="Dores De Cabeça"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={dorNoCorpo === 1}
                  onChange={handleChange}
                  name="dorNoCorpo"
                />
              }
              label="Dores no Corpo"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={calafrio === 1}
                  onChange={handleChange}
                  name="calafrio"
                />
              }
              label="Calafrio"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={nauseaOuVomito === 1}
                  onChange={handleChange}
                  name="nauseaOuVomito"
                />
              }
              label="Náusea Ou Vomito"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={narizEntupido === 1}
                  onChange={handleChange}
                  name="narizEntupido"
                />
              }
              label="Nariz Entupido"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={diarreia === 1}
                  onChange={handleChange}
                  name="diarreia"
                />
              }
              label="Diarreia"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={tosseComSangue === 1}
                  onChange={handleChange}
                  name="tosseComSangue"
                />
              }
              label="Tosse Com Sangue"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={olhosVermelhos === 1}
                  onChange={handleChange}
                  name="olhosVermelhos"
                />
              }
              label="Olhos Vermelhos"
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
        <ButtonOption type="button" onClick={() => submitSymptoms('empty')}>
          Não tenho nenhuma
        </ButtonOption>
      </Container>
    </>
  );
}

Symptoms.displayName = 'Symptoms';

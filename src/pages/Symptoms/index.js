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
    tosse: 0,
    dificuldadeDeRespirar: 0,
    doresMusculares: 0,
    exaustaoOuFraqueza: 0,
    perdaDoApetite: 0,
    producaoDeCatarro: 0,
    dorDeGarganta: 0,
    dorDeCabeca: 0,
    sanguePeloNarizOuBoca: 0,
    diarreia: 0,
    enjooOuVomito: 0,
    dorDeBarriga: 0,
    irritacaoNosOlhos: 0,
    confusaoOuSonolencia: 0,
    tonturas: 0,
    dorNoPeito: 0,
    dificuldadeDeSentirCheiroOuGosto: 0,
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
      tosse: 0,
      dificuldadeDeRespirar: 0,
      doresMusculares: 0,
      exaustaoOuFraqueza: 0,
      perdaDoApetite: 0,
      producaoDeCatarro: 0,
      dorDeGarganta: 0,
      dorDeCabeca: 0,
      sanguePeloNarizOuBoca: 0,
      diarreia: 0,
      enjooOuVomito: 0,
      dorDeBarriga: 0,
      irritacaoNosOlhos: 0,
      confusaoOuSonolencia: 0,
      tonturas: 0,
      dorNoPeito: 0,
      dificuldadeDeSentirCheiroOuGosto: 0,
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
    tosse,
    dificuldadeDeRespirar,
    doresMusculares,
    exaustaoOuFraqueza,
    perdaDoApetite,
    producaoDeCatarro,
    dorDeGarganta,
    dorDeCabeca,
    sanguePeloNarizOuBoca,
    diarreia,
    enjooOuVomito,
    dorDeBarriga,
    irritacaoNosOlhos,
    confusaoOuSonolencia,
    tonturas,
    dorNoPeito,
    dificuldadeDeSentirCheiroOuGosto,
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
                  checked={dificuldadeDeRespirar === 1}
                  onChange={handleChange}
                  name="dificuldadeDeRespirar"
                />
              }
              label="Dificuldade de respirar"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={doresMusculares === 1}
                  onChange={handleChange}
                  name="doresMusculares"
                />
              }
              label="Dores Musculares"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={exaustaoOuFraqueza === 1}
                  onChange={handleChange}
                  name="exaustaoOuFraqueza"
                />
              }
              label="Exaustão ou Fraqueza"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={perdaDoApetite === 1}
                  onChange={handleChange}
                  name="perdaDoApetite"
                />
              }
              label="Perda do Apetite"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={producaoDeCatarro === 1}
                  onChange={handleChange}
                  name="producaoDeCatarro"
                />
              }
              label="Produção de catarro"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={dorDeGarganta === 1}
                  onChange={handleChange}
                  name="dorDeGarganta"
                />
              }
              label="Dor de Garganta"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={dorDeCabeca === 1}
                  onChange={handleChange}
                  name="dorDeCabeca"
                />
              }
              label="Dor de cabeça"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={sanguePeloNarizOuBoca === 1}
                  onChange={handleChange}
                  name="sanguePeloNarizOuBoca"
                />
              }
              label="Sangue pelo nariz ou boca"
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
            <FormControlLabel
              control={
                <CheckBox
                  checked={enjooOuVomito === 1}
                  onChange={handleChange}
                  name="enjooOuVomito"
                />
              }
              label="Enjôo ou vômito"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={dorDeBarriga === 1}
                  onChange={handleChange}
                  name="dorDeBarriga"
                />
              }
              label="Dor de barriga"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={irritacaoNosOlhos === 1}
                  onChange={handleChange}
                  name="irritacaoNosOlhos"
                />
              }
              label="Irritação nos olhos"
            />
            <FormControlLabel
              control={
                <CheckBox
                  checked={confusaoOuSonolencia === 1}
                  onChange={handleChange}
                  name="confusaoOuSonolencia"
                />
              }
              label="Confusão ou sonolência"
            />

            <FormControlLabel
              control={
                <CheckBox
                  checked={tonturas === 1}
                  onChange={handleChange}
                  name="tonturas"
                />
              }
              label="Tonturas"
            />

            <FormControlLabel
              control={
                <CheckBox
                  checked={tonturas === 1}
                  onChange={handleChange}
                  name="tonturas"
                />
              }
              label="Tonturas"
            />

            <FormControlLabel
              control={
                <CheckBox
                  checked={dorNoPeito === 1}
                  onChange={handleChange}
                  name="dorNoPeito"
                />
              }
              label="Dor no peito"
            />

            <FormControlLabel
              control={
                <CheckBox
                  checked={dificuldadeDeSentirCheiroOuGosto === 1}
                  onChange={handleChange}
                  name="dificuldadeDeSentirCheiroOuGosto"
                />
              }
              label="Dificuldade de sentir cheiro ou gosto"
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

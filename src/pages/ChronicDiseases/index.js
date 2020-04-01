import React, { useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStyles } from './styles';

// Actions
import { AddInDb, verifySteps } from '../../actions/DegreeRiskActions';

// Components
import Button from '../../components/Button';
import CheckBox from '../../components/CheckBox';

export default function ChronicDiseases() {
  const history = useHistory();
  const Dispatch = useDispatch();

  const classes = useStyles();
  const [state, setState] = React.useState({
    diabetes: false,
    hypertension: false,
    heartFailure: false,
    copd: false,
    severeAsthma: false,
    hiv: false,
    cancer: false,
    transplanted: false,
    immunosuppressantUser: false,
  });

  const handleChange = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const submitChronicDiseases = state => {
    // submitChronicDiseases(state);
    let newState = {};
    Object.entries(state).forEach(item => {
      newState = {
        ...newState,
        [item[0]]: item[1] ? 1 : 0,
      };
    });

    const uid = localStorage.getItem('Uid');

    if (uid) {
      Dispatch(AddInDb(uid, newState, '/Cronicas')).then(() => {
        localStorage.setItem('fullStep', true);
        history.push('/sintomas');
      });
    }
  };

  const {
    diabetes,
    hypertension,
    heartFailure,
    copd,
    severeAsthma,
    hiv,
    cancer,
    transplanted,
    immunosuppressantUser,
  } = state;

  useEffect(() => {
    const uid = localStorage.getItem('Uid');
    if (uid) {
      Dispatch(verifySteps(uid, history));
    }
  }, []);

  return (
    <Container className={classes.chronicDiseases}>
      <Typography
        variant="subtitle1"
        component="h1"
        className={classes.chronicDiseasesLabel}
      >
        DOENÇAS CRÔNICAS
      </Typography>
      <Typography
        variant="subtitle1"
        component="h2"
        className={classes.chronicDiseasesQuestion}
      >
        Você possui alguma das doenças crônicas abaixo?
      </Typography>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>
          <FormControlLabel
            control={
              <CheckBox
                checked={diabetes}
                onChange={handleChange}
                name="diabetes"
              />
            }
            label="Diabetes"
          />
          <FormControlLabel
            control={
              <CheckBox
                checked={hypertension}
                onChange={handleChange}
                name="hypertension"
              />
            }
            label="Hipertensão"
          />
          <FormControlLabel
            control={
              <CheckBox
                checked={heartFailure}
                onChange={handleChange}
                name="heartFailure"
              />
            }
            label="Insuficiência Cardíaca"
          />
          <FormControlLabel
            control={
              <CheckBox checked={copd} onChange={handleChange} name="copd" />
            }
            label="DPOC"
          />
          <FormControlLabel
            control={
              <CheckBox
                checked={severeAsthma}
                onChange={handleChange}
                name="severeAsthma"
              />
            }
            label="Asma Grave"
          />
          <FormControlLabel
            control={
              <CheckBox checked={hiv} onChange={handleChange} name="hiv" />
            }
            label="HIV"
          />
          <FormControlLabel
            control={
              <CheckBox
                checked={cancer}
                onChange={handleChange}
                name="cancer"
              />
            }
            label="Câncer"
          />
          <FormControlLabel
            control={
              <CheckBox
                checked={transplanted}
                onChange={handleChange}
                name="transplanted"
              />
            }
            label="Transplantados (qualquer órgão)"
          />
          <FormControlLabel
            control={
              <CheckBox
                checked={immunosuppressantUser}
                onChange={handleChange}
                name="immunosuppressantUser"
              />
            }
            label="Usuário de Medicação Imunossupressora"
          />
        </FormGroup>
      </FormControl>
      <Button
        variant="contained"
        theme="primary"
        onClick={() => submitChronicDiseases(state)}
        className={classes.chronicDiseasesBtn}
      >
        Continuar
      </Button>
    </Container>
  );
}

ChronicDiseases.displayName = 'ChronicDiseases';

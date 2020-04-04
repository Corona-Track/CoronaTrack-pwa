import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStyles } from './styles';

// Components
import Button from '../../components/Button';

// Action
import { symptEval } from '../../actions/DegreeRiskActions';

// Result Components
import ResultStatus from './components/ResultStatus';
import Loading from '../../components/Loading';

export default function Result() {
  const Dispatch = useDispatch();
  const history = useHistory();

  const classes = useStyles();
  const [result, setResult] = useState('');

  const goToMap = () => {
    // return redirect to map (based on user lat and lng?)
    history.push('/');
  };
  useEffect(() => {
    const uid = localStorage.getItem('Uid');
    Dispatch(symptEval(uid)).then(res => {
      const newResult = res.replace('é', 'e').toLowerCase();
      setResult(newResult);
    });
  }, [result]);
  return (
    <>
      {result === '' ? (
        <Loading open />
      ) : (
        <Container className={classes.result}>
          <Typography
            variant="subtitle1"
            component="h1"
            className={classes.resultLabel}
          >
            <Box textAlign="center">RESULTADO</Box>
          </Typography>
          <ResultStatus result={result} />
          {/* <video width="320" height="240" autoPlay="autoplay">
            <source src="video/QDEOL.mp4" type="video/mp4" />
          </video> */}
          <Button
            variant="contained"
            theme="primary"
            onClick={() => goToMap()}
            className={classes.resultBtn}
          >
            VEJA NO MAPA
          </Button>
          <Typography
            variant="subtitle1"
            component="p"
            className={classes.resultFooter}
          >
            Veja a evolução de risco na sua cidade, com base em dados de outros
            usuários.
          </Typography>
        </Container>
      )}
    </>
  );
}

Result.displayName = 'Result';

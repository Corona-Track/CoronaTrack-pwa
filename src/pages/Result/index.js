import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useStyles, Container } from './styles';

// Components
import Button from '../../components/Button';

// Action
import { symptEval } from '../../actions/DegreeRiskActions';

// Result Components
import ResultStatus from './components/ResultStatus';
import Loading from '../../components/Loading';

export default function Result() {
  const history = useHistory();
  const Dispatch = useDispatch();

  const classes = useStyles();
  const [result, setResult] = useState('');

  const goToMap = () => {
    // return redirect to map (based on user lat and lng?)
    history.push('/');
  };
  useEffect(() => {
    const uid = localStorage.getItem('Uid');
    console.log(uid);
    Dispatch(symptEval(uid)).then(res => {
      const newResult = res.replace('é', 'e').toLowerCase();
      setResult(newResult);
    });
  }, [result, Dispatch]);

  return (
    <>
      {result === '' ? (
        <Loading open />
      ) : (
        <Container className={classes.result}>
          <h1 className={classes.resultLabel}>
            <Box textAlign="center">RESULTADO</Box>
          </h1>
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
          <p className={classes.resultFooter}>
            Veja a evolução de risco na sua cidade, com base em dados de outros
            usuários.
          </p>
        </Container>
      )}
    </>
  );
}

Result.displayName = 'Result';

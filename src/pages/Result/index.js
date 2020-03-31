import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { useStyles } from './styles';
import Layout from '../layout';
// Components
import Button from '../../components/Button';

// Result Components
import ResultStatus from './components/ResultStatus';

export default function Result({ result }) {
  const classes = useStyles();

  const goToMap = () => {
    // return redirect to map (based on user lat and lng?)
  };

  return (
    <Layout>
      <Container className={classes.result}>
        <Typography
          variant="subtitle1"
          component="h1"
          className={classes.resultLabel}
        >
          <Box textAlign="center">RESULTADO</Box>
        </Typography>
        <ResultStatus result={result} />
        <Box component="div" textAlign="center">
          <video
            width="320"
            height="240"
            controls="controls"
            autoplay="autoplay"
          >
            <source src="video/QDEOL.mp4" type="video/mp4" />
          </video>
        </Box>
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
    </Layout>
  );
}

Result.displayName = 'Result';

Result.propTypes = {
  result: PropTypes.string.isRequired,
};

import React from 'react';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { useStyles } from './styles';
import { STATUS } from './constants';

export default function ResultStatus({ result }) {
  const classes = useStyles();
  const resultColor = STATUS[result].COLOR;
  const Results = STATUS[result];

  return (
    <Container className={classes.resultStatus}>
      <Typography
        variant="subtitle2"
        component="h2"
        className={classes.resultStatusTitle}
      >
        <Box textAlign="center">Seu grau de risco é</Box>
      </Typography>
      <Typography
        variant="subtitle3"
        component="h3"
        className={classes.resultStatusCalculated}
      >
        <Box textAlign="center" color={resultColor} fontWeight="fontWeightBold">
          {Results.TITLE}
        </Box>
      </Typography>
      <Typography
        variant="subtitle4"
        component="p"
        className={classes.resultStatusDescription}
      >
        {Results.DESCRIPTION_PREFIX}
        <Box
          component="span"
          color={resultColor}
          className={classes.resultStatusDescriptionFinalStatus}
        >
          <Box color={resultColor} fontWeight="fontWeightBold">
            risco é {result}
          </Box>
        </Box>
        {Results.DESCRIPTION_SUFIX}
      </Typography>
    </Container>
  );
}

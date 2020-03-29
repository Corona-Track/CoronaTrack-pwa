import React from 'react';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import Box from '@material-ui/core/Box';

import { useStyles } from './styles';
import {STATUS} from './constants';

export default function ResultStatus({result}) {
  const classes = useStyles()
  const resultColor = STATUS[result]["COLOR"]
  const description = STATUS[result]
  return (
    <Container className={classes.resultStatus}>
      <Typography
        variant="subtitle1"
        component="h2"
      >
        <Box textAlign="center">Seu grau de risco é</Box>
      </Typography>
      <Typography
          variant="subtitle1"
          component="h3"
          className={classes.resultStatusCalculated}
        >
          <Box
            textAlign="center"
            color={resultColor}
            fontWeight="fontWeightBold"
          >
            {result}
          </Box>
        </Typography>
      <Typography
        variant="subtitle1"
        component="p"
        className={classes.resultStatusDescription}
      >
        {description.DESCRIPTION_PREFIX}
        <Typography
          component="span"
          color={resultColor}
          className={classes.resultStatusDescriptionFinalStatus}
        >
          <Box
            color={resultColor}
            fontWeight="fontWeightBold"
            >
              risco é {result}
          </Box>
        </Typography>        
        {description.DESCRIPTION_SUFIX}
      </Typography>
    </Container>
  );
}

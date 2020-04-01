import { makeStyles } from '@material-ui/core/styles';
import { $gray700 } from '../../../../styles/variables';

export const useStyles = makeStyles(theme => ({
  resultStatus: {
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  resultStatusTitle: {
    margin: '-0.5rem',
    '& div': {
      fontWeight: 500,
      fontFamily: "'Prompt', sans-serif",
    },
  },
  resultStatusCalculated: {
    textTransform: 'uppercase',
    fontSize: '3rem',
    '& h3 > div': {
      lineHeight: '3rem',
    },
  },
  resultStatusDescription: {
    textAlign: 'center',
    color: $gray700,
  },
  resultStatusDescriptionFinalStatus: {
    '& div': {
      display: 'inline-block',
    },
  },
}));

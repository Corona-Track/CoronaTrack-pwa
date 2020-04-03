import { makeStyles } from '@material-ui/core/styles';
import { $gray600, $gray700 } from '../../styles/variables';

export const useStyles = makeStyles(() => ({
  result: {
    paddingLeft: '2rem',
    paddingRight: '2rem',
    fontSize: '1rem',
  },
  resultLabel: {
    color: $gray600,
    marginTop: '3rem',
    fontFamily: "'Prompt', sans-serif",
  },
  resultBtn: {
    marginTop: '2rem',
  },
  resultFooter: {
    fontSize: '12px',
    lineHeight: '17px',
    textAlign: 'center',
    marginBottom: '30px',
    color: $gray700,
  },
}));

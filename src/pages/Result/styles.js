import { makeStyles } from '@material-ui/core/styles';
import { $gray600, $gray700 } from '../../styles/variables';

export const useStyles = makeStyles(() => ({
    result : {
      paddingLeft: '2rem',
      paddingRight: '2rem'
    },
    resultLabel: {
      color: $gray600,
      marginTop: '3rem',
      fontFamily: "'Prompt', sans-serif",
    }
  }));
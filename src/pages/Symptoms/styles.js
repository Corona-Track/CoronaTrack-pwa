import { makeStyles } from '@material-ui/core/styles';
import { $gray600, $gray700 } from '../../styles/variables';

export const useStyles = makeStyles((theme) => ({
    symptoms : {
      paddingLeft: '2rem',
      paddingRight: '2rem'
    },
    symptomsTitle: {
      color: $gray600,
      marginTop: '3rem'
    },
    symptomsQuestion: {
      fontWeight: 500,
      fontSize: '1.3rem',
      lineHeight: '2rem',
      marginTop: '1rem'
    },
    formControl: {
      color: $gray700,
      marginTop: '2.8rem'
    },
    symptomsBtn: {
      marginTop: '2rem'
    }
  }));
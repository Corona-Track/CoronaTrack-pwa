import { makeStyles } from '@material-ui/core/styles';
import { $gray600, $gray700 } from '../../styles/variables';

export const useStyles = makeStyles((theme) => ({
    chronicDiseases : {
      paddingLeft: '2rem',
      paddingRight: '2rem'
    },
    chronicDiseasesLabel: {
      color: $gray600,
      marginTop: '3rem',
      fontFamily: "'Prompt', sans-serif",
    },
    chronicDiseasesQuestion: {
      fontFamily: "'Prompt', sans-serif",
      fontWeight: 500,
      fontSize: '1.3rem',
      lineHeight: '2rem',
      marginTop: '1rem'
    },
    formControl: {
      color: $gray700,
      marginTop: '2.8rem',
      '& label > span:nth-child(2)': {
        fontWeight: 500,
        fontFamily: "'Prompt', sans-serif",
      }
    },
    chronicDiseasesBtn: {
      marginTop: '2rem'
    }
  }));

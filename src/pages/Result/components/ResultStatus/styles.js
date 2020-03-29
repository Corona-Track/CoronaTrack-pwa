import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    resultStatus: {
        marginTop: '2rem',
        marginBottom: '2rem'
    },
    resultStatusCalculated: {
      textTransform: 'uppercase',
      fontSize: '3rem'
    },
    resultStatusDescription: {
        textAlign: "center"
    },
    resultStatusDescriptionFinalStatus: {
        '& div': {
          display: "inline-block"
        }
    }
  }));

import { makeStyles } from '@material-ui/core/styles';
import { $gray600, $gray700 } from '../../styles/variables';

export const useStyles = makeStyles(() => ({
    result : {
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
        fontSize: '0.75rem',
        marginRight: '3rem',
        marginLeft: '3rem',
        textAlign: 'center',
        color: $gray700
    }
}));

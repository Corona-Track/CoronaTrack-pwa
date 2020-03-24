import { withStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';

export const Container = withStyles({
  root: {
    zIndex: 999,
    color: '#fff',
  },
})(Backdrop);

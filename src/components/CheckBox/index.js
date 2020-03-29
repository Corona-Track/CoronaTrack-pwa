import React from 'react';
import { $gray500 } from '../../styles/variables';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

export default withStyles({
    root: {
      color: $gray500,
      '&$checked': {
        color: '#235DE3'
      }
    },
    checked: {},
  })((props) => <Checkbox {...props} />);

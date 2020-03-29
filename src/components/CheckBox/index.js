import React from 'react';
import { $gray500 } from '../../styles/variables';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

export default withStyles({
    root: {
      color: $gray500,
      fontFamily: "'Prompt', sans-serif",
      '&$checked': {
        color: '#235DE3'
      },
      '& label, span': {
        fontFamily: "'Prompt', sans-serif",
        fontWeight: 500,
      }
    },
    checked: {},
  })((props) => <Checkbox {...props} />);

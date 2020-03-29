import React from 'react';
import { $gray500 } from '../../styles/variables';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';

// TODO improve customization for this component
export default withStyles({
    root: {
      color: $gray500,
      '&$checked': {
        color: "primary"
      },
    },
    checked: {},
  })((props) => <Checkbox color="primary" {...props} />);

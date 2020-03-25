import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';

export default function CheckBox(props) {
    const GreenCheckbox = withStyles({
        root: {
          color: 'default',
          '&$checked': {
            color: "#24A39B",
          },
        },
        checked: {},
      })(props => <Checkbox color="default" {...props} />)
    return(
        <GreenCheckbox 
            onChange={props.onChange}
            checked={props.checked}
        />
    )
}
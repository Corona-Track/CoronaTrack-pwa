import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';

import { $gray500, $brandColorPrimary } from '../../styles/variables';

export const InputText = withStyles({
  root: {
    width: '100%',
    marginBottom: '16px',
    fontFamily: "'Prompt', sans-serif",
    '& label.Mui-focused': {
      color: $brandColorPrimary,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: $brandColorPrimary,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: $gray500,
    },
    '& label, input': {
      fontFamily: "'Prompt', sans-serif",
    },
  },
})(TextField);

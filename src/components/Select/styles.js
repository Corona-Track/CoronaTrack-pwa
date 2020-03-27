// import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import Select from '@material-ui/core/Select';

import FormControl from '@material-ui/core/FormControl';

import { $gray500, $brandColorPrimary } from '../../styles/variables';

export const Container = withStyles({
  root: {
    width: '100%',
    marginBottom: '16px',
    '& .Mui-focused, & .Mui-focused': {
      color: $brandColorPrimary,
    },
    '& .MuiSelect-select:focus': {
      background: '#fff',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: $brandColorPrimary,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: $gray500,
    },
    '& label, input': {
      fontFamily: "'Prompt', sans-serif",
    },
  },
})(FormControl);

export const SelectUI = withStyles({
  root: {
    width: '100%',
  },
})(Select);

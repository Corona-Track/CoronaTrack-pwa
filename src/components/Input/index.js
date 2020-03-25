import React, { useState } from 'react';
import { GoEyeClosed, GoEye } from 'react-icons/go';

import { InputAdornment, IconButton } from '@material-ui/core';

import { InputText } from './styles';

export default function Input(props) {
  const [showPassword, setShowPassword] = useState(true);

  function IconEye() {
    return (
      <InputAdornment position="end">
        <IconButton
          aria-label="Toggle password visibility"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <GoEyeClosed /> : <GoEye />}
        </IconButton>
      </InputAdornment>
    );
  }

  return (
    <InputText
      {...props}
      type={props.label === 'Password' && showPassword ? 'password' : 'text'}
      InputProps={{
        endAdornment: props.label === 'Password' ? IconEye() : '',
      }}
    />
  );
}

import React, { useState } from 'react';

import { GoEyeClosed, GoEye } from 'react-icons/go';

import { InputAdornment, IconButton } from '@material-ui/core';
import { InputText } from './styles';

export default function Input(props) {
  const { label, type } = props;
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
      type={label === 'Password' && showPassword ? 'password' : type}
      InputProps={{
        endAdornment: label === 'Password' ? IconEye() : '',
      }}
    />
  );
}

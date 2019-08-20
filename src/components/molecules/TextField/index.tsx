import React, { ReactNode, ChangeEventHandler } from 'react';
import MuiTextField, { TextFieldProps } from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Txt from '@src/components/atoms/Txt';

export type Props = {
  id: string;
  value: string;
  label: string;
  placeholder?: string;
  helperText?: ReactNode;
  fullWidth?: boolean;
  changed?: boolean;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  className?: string;
} & Pick<TextFieldProps, 'FormHelperTextProps'>;

const TextField = ({
  id,
  value,
  label,
  placeholder,
  helperText,
  fullWidth,
  error,
  required,
  disabled,
  onChange,
  startAdornment,
  endAdornment,
  className,
  FormHelperTextProps,
}: Props) => {
  return (
    <MuiTextField
      id={id}
      name={id}
      value={value}
      label={label}
      placeholder={placeholder}
      helperText={<Txt size={`ss`}>{error ? error : helperText}</Txt>}
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
      error={!!error}
      onChange={onChange}
      InputProps={{
        startAdornment: startAdornment ? (
          <InputAdornment position="start">{startAdornment}</InputAdornment>
        ) : (
          undefined
        ),
        endAdornment: endAdornment ? (
          <InputAdornment position="end">{endAdornment}</InputAdornment>
        ) : (
          undefined
        ),
      }}
      className={className}
      FormHelperTextProps={FormHelperTextProps}
    />
  );
};

export default TextField;

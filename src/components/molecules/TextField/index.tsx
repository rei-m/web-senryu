import React from 'react';
import MuiTextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import makeStyles from '@src/styles/makeStyles';
import Txt from '@src/components/atoms/Txt';
import Counter from '@src/components/atoms/Counter';

export type Props = {
  id: string;
  value: string;
  label: string;
  rows?: number;
  placeholder?: string;
  helperText?: React.ReactNode;
  fullWidth?: boolean;
  changed?: boolean;
  error?: string | null;
  required?: boolean;
  disabled?: boolean;
  maxLength?: number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
  className?: string;
};

const useStyles = makeStyles(() => ({
  helperText: {
    textAlign: 'left',
  },
  helperTextCounter: {
    textAlign: 'right',
  },
}));

const TextField = ({
  id,
  value,
  label,
  rows,
  placeholder,
  helperText,
  fullWidth,
  error,
  required,
  disabled,
  maxLength,
  onChange,
  startAdornment,
  endAdornment,
  className,
}: Props) => {
  const classes = useStyles();
  const helperTextEl = error ? (
    <Txt size={`ss`}>{error}</Txt>
  ) : helperText ? (
    helperText
  ) : maxLength ? (
    <Counter size={`ss`} current={value.length} maximum={maxLength} />
  ) : (
    undefined
  );
  return (
    <MuiTextField
      id={id}
      name={id}
      value={value}
      label={label}
      placeholder={placeholder}
      helperText={helperTextEl}
      fullWidth={fullWidth}
      required={required}
      disabled={disabled}
      multiline={rows !== undefined && 0 < rows}
      rows={rows}
      rowsMax={rows}
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
      FormHelperTextProps={{
        classes: {
          root:
            error || helperText
              ? classes.helperText
              : maxLength
              ? classes.helperTextCounter
              : '',
        },
      }}
    />
  );
};

export default TextField;

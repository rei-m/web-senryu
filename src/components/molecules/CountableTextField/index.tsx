import React from 'react';
import makeStyles from '@src/styles/makeStyles';
import TextField, {
  Props as TextFieldProps,
} from '@src/components/molecules/TextField';

export type Props = Omit<TextFieldProps, 'helperText'> & {
  maxTextSize: number;
};

const useStyles = makeStyles(() => ({
  counter: {
    textAlign: 'right',
  },
  error: {
    textAlign: 'left',
  },
}));

const CountableTextField = (props: Props) => {
  const classes = useStyles();
  return (
    <TextField
      {...props}
      error={props.error}
      helperText={`${props.value.length}/${props.maxTextSize}`}
      FormHelperTextProps={{
        classes: { root: props.error ? classes.error : classes.counter },
      }}
    />
  );
};

export default CountableTextField;

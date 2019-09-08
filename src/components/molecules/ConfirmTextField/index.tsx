import React from 'react';
import clsx from 'clsx';
import makeStyles from '@src/styles/makeStyles';
import Txt from '@src/components/atoms/Txt';

export type ConfirmTextFieldProps = {
  label?: string;
  value: string;
  className?: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: 'left',
  },
  labelRow: {
    marginBottom: theme.spacing(0.5),
  },
  label: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightRegular,
    lineHeight: 1,
  },
}));

const ConfirmTextField = ({
  label,
  value,
  className,
}: ConfirmTextFieldProps) => {
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)}>
      {label && (
        <div className={classes.labelRow}>
          <Txt size={`ss`} className={classes.label}>
            {label}
          </Txt>
        </div>
      )}
      <div>
        <Txt size={`s`}>{value}</Txt>
      </div>
    </div>
  );
};

export default ConfirmTextField;

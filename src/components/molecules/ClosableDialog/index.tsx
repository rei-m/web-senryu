import React, { FC } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Dialog, { DialogProps } from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { ThemeInterface } from '@src/styles/theme';

export type Props = {
  title?: string;
  open: boolean;
  onClose: () => void;
} & Pick<DialogProps, 'PaperProps'>;

const useStyles = makeStyles<ThemeInterface>(theme => ({
  title: {
    padding: theme.spacing(2),
    height: 64,
    display: 'flex',
    alignItems: 'center',
    fontSize: theme.fontSize.ll,
  },
  button: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: theme.spacing(2),
  },
  icon: {
    fontSize: theme.fontSize.ll,
  },
  body: {
    padding: theme.spacing(2),
    paddingTop: 0,
  },
}));

const ClosableDialog: FC<Props> = ({
  children,
  title,
  open,
  onClose,
  PaperProps,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      open={open}
      onClose={onClose}
      scroll={`body`}
      PaperProps={PaperProps}
    >
      <DialogTitle disableTypography={true} className={classes.title}>
        {title}
        <IconButton onClick={onClose} className={classes.button}>
          <CloseIcon className={classes.icon} />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.body}>{children}</DialogContent>
    </Dialog>
  );
};

export default ClosableDialog;

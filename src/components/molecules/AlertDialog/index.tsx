import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export type Props = {
  open?: boolean;
  dialogTitle: React.ReactNode;
  contentText: React.ReactNode;
  positiveButtonLabel: string;
  negativeButtonLabel: string;
  onClickPositive: () => void;
  onClose: () => void;
};

const AlertDialog = ({
  open,
  dialogTitle,
  contentText,
  positiveButtonLabel,
  negativeButtonLabel,
  onClickPositive,
  onClose,
}: Props) => (
  <Dialog
    maxWidth={`md`}
    open={!!open}
    onClose={onClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
  >
    <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {contentText}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        {negativeButtonLabel}
      </Button>
      <Button onClick={onClickPositive} color="primary" autoFocus>
        {positiveButtonLabel}
      </Button>
    </DialogActions>
  </Dialog>
);

export default AlertDialog;
